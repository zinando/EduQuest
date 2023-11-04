"""This is the main api module"""

from flask import request
from appclasses.user_auth import UserAuth
from appclasses.subjectclass import SUBJECTS
import json
from datetime import datetime
from extensions import app, db, jwt
from flask_jwt_extended import jwt_required, get_jwt_identity, current_user
from models import User, Subjects, Cohorts, Examina, Questions, Result, ClassResult
from functions import resources as resource
from functions import myfunctions as myfunc
from flask_cors import cross_origin


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.userid


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(userid=identity).one_or_none()


@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    err = 'authentication token has expired.'
    message = 'User could not be authenticated. Pleas login again!'
    return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [err]}), 401


@app.route("/", methods=["GET", "POST"])
@cross_origin()
def index():
    #  db.create_all()
    #  get the number of super admins present
    admin = User.query.filter_by(admin_type='super').count()
    return json.dumps({"status": 1, 'data': admin, "message": "Hello World"})


@app.route("/signup", methods=["POST"])
def signup() -> str:
    """ receives sign up request and converts the data into python dict then returns a response """
    # db.create_all()
    data = request.get_json()
    auth = UserAuth(data['email'], data['password'], first_name=data['first_name'], admin_type='super',
                    other_names=data['other_names'], email=data['email'], surname=data['surname'])
    response = auth.validate_new_user_credentials()
    return json.dumps(response)


@app.route("/login", methods=["POST"])
def login() -> str:
    """ receives login request and converts the data into python dict then returns a response """
    data = request.get_json()
    auth = UserAuth(data['userid'], data['password'])
    response = auth.authenticate_user()
    return json.dumps(response)


@app.route("/dashboard/<user>", methods=["GET", "POST"])
@jwt_required()
def dashboard(user: str):
    """ Implements the user dashboard requests"""
    if 'Authorization' not in request.headers:
        message = 'Authorization header not in request headers'
        return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})

    userid = get_jwt_identity()
    user_view = UserAuth(userid, 'xgdjbehj').user_access_view()[current_user.admin_type]

    if request.args.get("action") == "FETCH-EXAM-INSTANCES":
        worker1 = resource.fetch_examina()
        worker2 = resource.fetch_user_stat()
        worker3 = resource.fetch_exam_skedule()
        worker4 = resource.fetch_classes()
        worker5 = resource.fetch_subjects()

        return json.dumps({'status': 1, 'exams': worker1, 'subjects': worker5, 'klass': worker4, 'user_stat': worker2,
                           'skedule': worker3, 'message': 'success!', 'error': [None]})

    elif request.args.get("action") == "FETCH-CLASS-RESULT":
        data = request.get_json()
        worker1 = resource.fetch_class_result(data['examina_id'], data['class_id'])
        worker2 = resource.fetch_class_result_stat(data['examina_id'], data['class_id'], worker1) if len(worker1) > 0 else {}

        return json.dumps({'status': 1, 'data': worker1, 'stat': worker2, 'message': 'success!', 'error': [None]})

    elif request.args.get("action") == "FETCH-EXAM-CLASS-LIST":
        if current_user.admin_type == "student":
            return json.dumps({'status': 2, 'data': None, 'message': 'Permission denied', 'error': ['Permission denied']})
        worker = resource.fetch_exam_class_list()

        return json.dumps({'status': 1, 'data': worker, 'message': 'success!', 'error': [None]})

    elif request.args.get("action") == "FETCH-RESULT":
        """ fetches result of a given user_id for a given exam instance """
        data = request.get_json()
        worker = resource.fetch_user_result_data(int(data['examina_id']), int(data['user_id']))

        return json.dumps({'status': 1, 'data': worker, 'message': 'Success', 'error': [None]})

    if user == "SUPER" or user == 'super':
        if current_user is None or "SUPER_DASHBOARD" not in user_view:
            message = 'User does not have access privilege'
            return json.dumps({'status': 404, 'data': None, 'message': message, 'error': [message]})

        if request.args.get("action") == "CREATE-EXAM":
            data = request.get_json()

            log = Examina()
            log.title = data['exam_title'].title()
            log.type = data['exam_type']
            log.cohorts = json.dumps(data['classes'])
            log.start = datetime.strptime(data['start_date'], "%d/%m/%Y")
            log.end = datetime.strptime(data['end_date'], "%d/%m/%Y")
            if len(data['subjects']) > 0:
                log.exclude_subjs = json.dumps(data['subjects'])
            db.session.add(log)
            db.session.commit()

            worker = resource.fetch_examina()
            return json.dumps(
                {'status': 1, 'message': 'New Exam created successfully', 'data': worker, 'error': [None]})

        elif request.args.get('action') == "DELETE-EXAM-INSTANCE":
            exam_id = request.get_json()['id']
            Examina.query.filter_by(exid=exam_id).delete()
            db.session.commit()
            worker = resource.fetch_examina()
            return json.dumps({'status': 1, 'message': 'Record deleted successfully', 'data': worker, 'error': [None]})

        elif request.args.get('action') == "PUBLISH-RESULT":
            exam_id = request.get_json()['exam_id']
            exam_instance = Examina.query.filter_by(exid=exam_id).first()
            #   if exam_instance.end >= datetime.now():
            #       return json.dumps(
            #                   {'status': 2, 'message': 'The exam is still ongoing.', 'data': None, 'error': [None]})

            if exam_instance.publish_result_status == 'pending':
                Examina.query.filter_by(exid=exam_id).update({"publish_result_status": "published", "publish_date": datetime.now()})
                message = 'Successfully published.'
            else:
                Examina.query.filter_by(exid=exam_id).update({"publish_result_status": "pending", "publish_date": datetime.now()})
                message = 'Successfully Withdrawn result from public view.'
            db.session.commit()

            return json.dumps({'status': 1, 'message': message, 'data': None, 'error': [None]})

        elif request.args.get('action') == "DELETE-EXCLUDED-ITEM":
            data = request.get_json()
            exam = Examina.query.filter_by(exid=data['exam_id']).first()
            excluded = json.loads(exam.exclude_subjs)
            new_excluded = [x for x in excluded if x != data['excluded_id']]
            Examina.query.filter_by(exid=data['exam_id']).update({'exclude_subjs': json.dumps(new_excluded)})
            db.session.commit()
            worker = resource.fetch_examina()
            return json.dumps({'status': 1, 'message': 'Record deleted successfully', 'data': worker, 'error': [None]})

    if user == "TEACHER" or user == "teacher":
        if current_user is None or "SET_QUESTIONS" not in user_view:
            message = 'User does not have access privilege'
            return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})

        if request.args.get("action") == "FETCH-QUESTIONS":
            data = request.get_json()
            worker = resource.fetch_subject_exam_question(data["exam_id"], data["subject_id"])
            return json.dumps({'status': 1, 'data': worker, 'message': 'success!', 'error': [None]})

        elif request.args.get("action") == "UPDATE-QUESTION-SETTINGS":
            data = request.get_json()
            start = datetime.strptime(data['start_date'], "%d/%m/%Y, %H:%M:%S")
            end = datetime.strptime(data['end_date'], "%d/%m/%Y, %H:%M:%S")
            if Questions.query.filter_by(examina_id=data['examina_id'], subject_id=data['subject_id']).count() == 0:
                new = Questions()
                new.subject_id = data['subject_id']
                new.examina_id = data['examina_id']
                new.instruction = data['instruction']
                new.start = start
                new.end = end
                db.session.add(new)
            else:
                Questions.query.filter_by(examina_id=data['examina_id'], subject_id=data['subject_id']) \
                    .update({'start': start, 'end': end, 'instruction': data['instruction'],
                             'approval_status': 'pending', 'approval_request': 0})
            db.session.commit()
            worker = {}
            worker['start'] = myfunc.break_date_time_into_digits(start)
            worker['end'] = myfunc.break_date_time_into_digits(end)
            worker['instruction'] = data['instruction']

            return json.dumps({'status': 1, 'data': worker, 'message': 'Updated successfully!', 'error': [None]})

        elif request.args.get("action") == "ADD-EXAM-QUESTION":
            data = request.get_json()
            data['options'] = [x.strip() for x in data['options']]
            data['answer'] = [y.strip() for y in data['answer']]
            mr = {}
            mr['question'] = data['question']
            mr['options'] = data['options']
            mr['answer'] = data['answer']
            mr['question_type'] = data['question_type']
            mr['image_url'] = ''

            if Questions.query.filter_by(examina_id=int(data['examina_id']),
                                         subject_id=int(data['subject_id'])).count() == 0:
                new = Questions()
                new.subject_id = int(data['subject_id'])
                new.examina_id = int(data['examina_id'])
                new.content = json.dumps([mr])
                db.session.add(new)
            else:
                myquery = Questions.query.filter_by(examina_id=int(data['examina_id']),
                                                    subject_id=int(data['subject_id'])) \
                    .first()
                if myquery.content:
                    json_content = json.loads(myquery.content)
                    json_content.append(mr)
                else:
                    json_content = [mr]
                Questions.query.filter_by(examina_id=int(data['examina_id']), subject_id=int(data['subject_id'])) \
                    .update({'content': json.dumps(json_content), 'approval_request': 0,
                             'approval_status': 'pending'})
            db.session.commit()

            # fetch question records
            worker = resource.fetch_subject_exam_question(data['examina_id'], data['subject_id'])
            print(worker)

            return json.dumps({'status': 1, 'data': worker, 'message': 'Question added successfully!', 'error': [None]})

        elif request.args.get("action") == "EDIT-EXAM-QUESTION":
            data = request.get_json()
            data['options'] = [x.strip() for x in data['options']]
            data['answer'] = [y.strip() for y in data['answer']]
            mr = {}
            mr['question'] = data['question']
            mr['options'] = data['options']
            mr['answer'] = data['answer']
            mr['question_type'] = data['question_type']
            mr['image_url'] = ''

            myquery = Questions.query.filter_by(examina_id=int(data['examina_id']), subject_id=int(data['subject_id'])) \
                .first()
            json_content = json.loads(myquery.content)
            try:
                question_index = json_content.index(data["question_to_edit"])
                new_content = [x for x in json_content if x != data["question_to_edit"]]
                new_content.insert(question_index, mr)
            except ValueError:
                return json.dumps({'status': 2, 'data': None, 'message': 'Operation was not successful',
                                   'error': ["Question was not found"]})

            Questions.query.filter_by(examina_id=int(data['examina_id']), subject_id=int(data['subject_id'])) \
                .update({'content': json.dumps(new_content), 'approval_request': 0, 'approval_status': 'pending'})
            db.session.commit()

            # fetch question records
            worker = resource.fetch_subject_exam_question(data['examina_id'], data['subject_id'])

            return json.dumps(
                {'status': 1, 'data': worker, 'message': 'Question edited successfully!', 'error': [None]})

        elif request.args.get("action") == "DELETE-EXAM-QUESTION":
            data = request.get_json()
            myquery = Questions.query.filter_by(examina_id=int(data['examina_id']), subject_id=int(data['subject_id'])) \
                .first()
            json_content = json.loads(myquery.content)
            try:
                question_index = json_content.index(data["question_to_edit"])
                new_content = [x for x in json_content if x != data["question_to_edit"]]
                print(question_index)
            except ValueError:
                return json.dumps({'status': 2, 'data': None, 'message': 'Operation was not successful',
                                   'error': ["Question was not found"]})

            Questions.query.filter_by(examina_id=int(data['examina_id']), subject_id=int(data['subject_id'])) \
                .update({'content': json.dumps(new_content), 'approval_request': 0, 'approval_status': 'pending'})
            db.session.commit()

            # fetch question records
            worker = resource.fetch_subject_exam_question(data['examina_id'], data['subject_id'])

            return json.dumps(
                {'status': 1, 'data': worker, 'message': 'Question edited successfully!', 'error': [None]})

        elif request.args.get("action") == "REQUEST-QUESTION-REVIEW":
            data = request.get_json()

            if Questions.query.filter_by(examina_id=data['examina_id'], subject_id=data['subject_id']).count() == 0:
                message = 'Question record not found'
                return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})
            else:
                my_query = Questions.query.filter_by(examina_id=data['examina_id'], subject_id=data['subject_id']) \
                    .first()
                if my_query.content:
                    if len(json.loads(my_query.content)) > 0:
                        # if request has already been made, cancel it
                        if my_query.approval_request == 0:
                            Questions.query.filter_by(examina_id=data['examina_id'], subject_id=data['subject_id']) \
                                .update({'approval_request': 1, 'approval_status': 'pending'})
                            message = "You have successfully requested for review of this question."
                            request_status = 1
                        else:
                            if my_query.approval_status == "approved":
                                return json.dumps({'status': 2, 'data': None, 'message': 'Invalid request.',
                                                   'error': ['Question has been approved already']})

                            Questions.query.filter_by(examina_id=data['examina_id'], subject_id=data['subject_id']) \
                                .update({'approval_request': 0})
                            message = "You have successfully cancelled the request for the review of this question."
                            request_status = 0
                        db.session.commit()

                        # fetch subject exam record statistics
                        worker = resource.fetch_subject_exam_stat(data['subject_id'], data['examina_id'])

                        return json.dumps({'status': 1, 'data': {'request_status': request_status}, 'exam_stat': worker,
                                           'message': message, 'error': [None]})

                message = 'No questions to review'
                return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})

        elif request.args.get("action") == "FETCH-RESULT-FOR-REVIEW":
            data = request.get_json()
            worker = resource.fetch_results_for_review(data['examina_id'], data['subject_id'])
            print(worker)
            return json.dumps({'status': 1, 'data': worker, 'message': 'success', 'error': None})

        elif request.args.get("action") == "REVIEW-RESULT":
            data = request.get_json()
            review_action = "approved" if data["action"] == "approve" else "rejected"
            query = ClassResult.query.filter_by(crid=data['classResultId']).first()
            #  check if result has already been reviewed by expert
            if (query.expert_approval == "approved" and data["action"] == "approve") or \
                    (query.expert_approval == "rejected" and data["action"] == "reject"):
                message = "Result already reviewed"
                return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})
            #  record review action
            ClassResult.query.filter_by(crid=data['classResultId']) \
                .update({'review_comment': data['comment'], 'expert_approval': review_action,
                         'last_review_date': datetime.now()})
            db.session.commit()

            return json.dumps({'status': 1, 'data': None, 'message': 'Successfully reviewed!', 'error': None})

    if user == "STUDENT" or user == "student":
        if current_user is None or "STUDENT_DASHBOARD" not in user_view:
            message = 'User does not have access privilege'
            return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})

        if request.args.get("action") == "FETCH-TODAY-EXAMS":
            worker = resource.fetch_today_exams()
            return json.dumps({'status': 1, 'data': worker, 'message': 'success!', 'error': [None]})

        elif request.args.get("action") == "FETCH-STUDENT-EXAM-QUESTION":
            data = request.get_json()
            worker = resource.fetch_exam_question(data['question_id'])
            return json.dumps({'status': 1, 'data': worker, 'message': 'success!', 'error': [None]})

        elif request.args.get("action") == "RECORD-EXAM-SCORE":
            data = request.get_json()
            subject_id = Questions.query.filter_by(qid=data['question_id']).first().subject_id
            # check for class result record and get its id
            check = ClassResult.query.filter_by(examina_id=data['examina_id'], cohort_id=current_user.cohort_id,
                                                subject_id=subject_id).first()
            if check:
                class_result_id = check.crid
            else:
                # log classresult first
                kresult = ClassResult()
                kresult.examina_id = data['examina_id']
                kresult.cohort_id = current_user.cohort_id
                kresult.subject_id = subject_id
                db.session.add(kresult)
                db.session.commit()

                class_result_id = kresult.crid

            # log individual result
            log = Result()
            log.classresult_id = class_result_id
            log.examina_id = data['examina_id']
            log.cohort_id = current_user.cohort_id
            log.user_id = current_user.id
            log.exam_script = json.dumps(data['script'])
            log.subject_id = subject_id
            db.session.add(log)
            db.session.commit()

            return json.dumps({'status': 1, 'data': None, 'message': 'Successfully submitted!', 'error': [None]})


    if user == "REVIEWER" or user == "reviewer":
        if current_user is None or "REVIEWER_DASHBOARD" not in user_view:
            message = 'User does not have access privilege'
            return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})

        if request.args.get("action") == "FETCH-REVIEW-ITEMS":
            worker = resource.fetch_review_items()
            return json.dumps({'status': 1, 'data': worker, 'message': 'success!', 'error': [None]})

        elif request.args.get("action") == "REVIEW-QUESTION":
            data = request.get_json()
            review_action = "approved" if data["action"] == "approve" else "rejected"
            query = Questions.query.filter_by(qid=data['question_id']).first()
            if query.approval_status == "approved" and data["action"] == "approve":
                message = "Question already approved"
                return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})
            if query.approval_status == "rejected" and data["action"] == "reject":
                message = "Question already rejected"
                return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})
            Questions.query.filter_by(qid=data['question_id']) \
                .update({'review_comment': data['comment'], 'approval_status': review_action,
                         'last_review_date': datetime.now()})
            db.session.commit()

            return json.dumps({'status': 1, 'data': None, 'message': "Successfully {}.".format(review_action),
                               'error': [None]})

        elif request.args.get("action") == "FETCH-RESULT-FOR-REVIEW":
            data = request.get_json()
            worker = resource.fetch_results_for_review(data['examina_id'], data['subject_id'])
            return json.dumps({'status': 1, 'data': worker, 'message': 'success', 'error': None})

        elif request.args.get("action") == "REVIEW-RESULT":
            data = request.get_json()
            review_action = "approved" if data["action"] == "approve" else "rejected"
            query = ClassResult.query.filter_by(crid=data['classResultId']).first()
            #  check if result has already been reviewed by reviewer
            if (query.admin_approval == "approved" and data["action"] == "approve") or \
                    (query.admin_approval == "rejected" and data["action"] == "reject"):
                message = "Result already reviewed"
                return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})
            #  record review action
            ClassResult.query.filter_by(crid=data['classResultId']) \
                .update({'review_comment': data['comment'], 'admin_approval': review_action,
                         'last_review_date': datetime.now()})
            db.session.commit()

            return json.dumps({'status': 1, 'data': None, 'message': 'Successfully reviewed!', 'error': None})



@app.route("/admin_actions/<action>", methods=["GET", "POST"])
@jwt_required()
def admin_actions(action: str):
    """ this serves all resources associated with admin action menu """
    # db.create_all()
    if 'Authorization' not in request.headers:
        message = 'Authorization header not in request headers'
        return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})

    userid = get_jwt_identity()
    user_view = UserAuth(userid, 'xgdjbehj').user_access_view()[current_user.admin_type]

    if current_user is None or "SUPER_DASHBOARD" not in user_view:
        message = 'User does not have access privilege'
        return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})

    if action == "manage_users":
        if request.args.get("action") == "FETCH-USERS":
            user_info = resource.fetch_users()
            class_info = resource.fetch_classes()
            return json.dumps({'status': 1, 'data': user_info, 'class': class_info, 'message': 'ok', 'error': None})
        elif request.args.get('action') == 'DELETE-USER':
            data = request.get_json()
            db.session.query(User).filter_by(id=data['id']).delete()
            db.session.commit()
            worker = resource.fetch_users()
            return json.dumps({'status': 1, 'data': worker, 'message': 'Subject deleted successfully', 'error': None})
        if request.args.get("action") == "ADD-USER":
            data = request.get_json()
            auth = UserAuth('xhdgbc', data['password'], first_name=data['first_name'],
                            admin_type=data['admin_type'], user_class=data['klass'],
                            other_names=data['other_names'], email=data['email'], surname=data['surname'])
            response = auth.validate_new_user_credentials()
            response['data'] = resource.fetch_users()
            return json.dumps(response)
        elif request.args.get('action') == 'EDIT-USER':
            data = request.get_json()
            try:
                db.session.query(User).filter_by(id=data['id']).update({'fname': data['first_name'],
                                                                        'sname': data['surname'],
                                                                        'cohort_id': data['klass'],
                                                                        'userid': data['userid'],
                                                                        'admin_type': data['admin_type'],
                                                                        'oname': data['other_names'],
                                                                        'email': data['email'],
                                                                        })
                db.session.commit()
                worker = resource.fetch_users()
                message = "Subject updated successfully"
                status = 1
                error = None
            except Exception as e:
                error = [str(e)]
                status = 2
                message = 'Operation was not successful'
                worker = None
            return json.dumps({'status': status, 'data': worker, 'message': message, 'error': error})

    elif action == "manage_subjects":
        if request.args.get('action') == 'FETCH-SUBJECTS':
            worker = resource.fetch_subjects()
            worker2 = resource.fetch_classes()
            worker3 = resource.fetch_subject_experts()
            return json.dumps(
                {'status': 1, 'data': worker, 'teacher': worker3, 'class': worker2, 'message': 'ok', 'error': None})

        elif request.args.get('action') == 'EDIT-SUBJECT':
            data = request.get_json()
            try:
                db.session.query(Subjects).filter_by(sid=data['id']).update({'title': data['title'],
                                                                             'general_title': data['general_title'],
                                                                             'cohort_id': data['class'],
                                                                             'subject_expert': data['teacher']})
                db.session.commit()
                worker = resource.fetch_subjects()
                message = "Subject updated successfully"
                status = 1
                error = None
            except Exception as e:
                error = [str(e)]
                status = 2
                message = 'Operation was not successful'
                worker = None
            return json.dumps({'status': status, 'data': worker, 'message': message, 'error': error})

        elif request.args.get('action') == 'DELETE-SUBJECT':
            data = request.get_json()
            db.session.query(Subjects).filter_by(sid=data['id']).delete()
            db.session.commit()
            worker = resource.fetch_subjects()
            return json.dumps({'status': 1, 'data': worker, 'message': 'Subject deleted successfully', 'error': None})

        elif request.args.get("action") == "ADD-SUBJECT":
            data = request.get_json()
            try:
                worker = SUBJECTS()
                worker.add_subject(data)
                status = 1
                message = 'Subject added successfully'
                error = None
                data = resource.fetch_subjects()
            except Exception as e:
                status = 2
                message = 'Operation was not successful'
                error = [str(e)]
                data = None

            response = {'status': status, 'data': data, 'message': message, 'error': error}
            return json.dumps(response)

    elif action == "manage_classes":
        if request.args.get('action') == 'FETCH-CLASSES':
            worker = resource.fetch_classes()
            return json.dumps({'status': 1, 'data': worker, 'message': 'ok', 'error': None})
        elif request.args.get('action') == 'EDIT-CLASS':
            data = request.get_json()
            try:
                db.session.query(Cohorts).filter_by(cid=data['id']).update({'classname': data['class_name']})
                db.session.commit()
                worker = resource.fetch_classes()
                message = "class updated successfully"
                status = 1
                error = None
            except Exception as e:
                error = [str(e)]
                status = 2
                message = 'Operation was not successful'
                worker = None
            return json.dumps({'status': status, 'data': worker, 'message': message, 'error': error})

        elif request.args.get('action') == 'DELETE-CLASS':
            data = request.get_json()
            db.session.query(Cohorts).filter_by(cid=data['id']).delete()
            db.session.commit()
            worker = resource.fetch_classes()
            return json.dumps({'status': 1, 'data': worker, 'message': 'class deleted successfully', 'error': None})

        elif request.args.get("action") == "ADD-CLASS":
            data = request.get_json()
            try:
                new = Cohorts()
                new.classname = data['class_name']
                db.session.add(new)
                db.session.commit()
                status = 1
                message = 'Class added successfully'
                error = None
                classList = resource.fetch_classes()
            except Exception as e:
                status = 2
                message = 'Operation was not successful'
                error = [str(e)]
                classList = None

            response = {'status': status, 'data': classList, 'message': message, 'error': error}
            return json.dumps(response)


if __name__ == "__main__":
    """main flask app"""
    app.run(debug=True, host='localhost', port=5000)
