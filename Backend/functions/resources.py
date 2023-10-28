""" this module contains functions that provide resources to clients """
from models import User, Subjects, Cohorts, Examina, Questions, Result, ClassResult
from extensions import db
from datetime import datetime
import json
from flask_jwt_extended import current_user
from functions import myfunctions as myfunc
import operator


def fetch_subjects(scope: str = "all", scope_id=None):
    """ fetches subjects based on a given scope """
    # scopes: all, user, class, solo
    if scope == "user":
        subjs = []
    elif scope == "class":
        subjs = []
    elif scope == "solo":
        subjs = []
    else:
        subjs = Subjects.query.order_by(Subjects.title.desc())
    data = []
    for subj in subjs:
        mr = {}
        mr['id'] = subj.sid
        mr['title'] = subj.title
        mr['general_title'] = subj.general_title
        mr['teacher'] = subj.subject_expert
        mr['klass'] = subj.cohort_id
        data.append(mr)

    return data


def fetch_users() -> list:
    """ fetches user instance with userid, otherwise fetches all user instances """

    users = User.query.order_by(User.sname.desc())
    user_info = []
    for user in users:
        mr = {}
        mr['id'] = user.id
        mr['userid'] = user.userid
        mr['first_name'] = user.fname
        mr['surname'] = user.sname
        mr['other_names'] = user.oname
        mr['email'] = user.email if user.email else ''
        mr['klass'] = user.cohort_id if user.cohort_id else ''
        mr['admin_type'] = user.admin_type
        user_info.append(mr)
    return user_info


def fetch_classes(scope_id: int = 0):
    """ fetches classes """

    if scope_id > 0:
        cohort = Cohorts.query.filter_by(cid=scope_id).first()
        return cohort
    else:
        cohort = Cohorts.query.order_by(Cohorts.classname.desc())
    data = []
    for subj in cohort:
        mr = {}
        mr['id'] = subj.cid
        mr['name'] = subj.classname
        data.append(mr)

    return data


def fetch_subject_experts():
    """ fetches users with admin_type equal to teacher """
    users = User.query.filter_by(admin_type='teacher').all()
    data = []
    if users:
        for user in users:
            mr = {}
            mr['id'] = user.id
            mr['name'] = "{} {}".format(user.sname, user.fname)
            data.append(mr)

    return data


def fetch_examina() -> list:
    """ fetches all examination instances """
    exams = Examina.query.order_by(Examina.start.desc())
    data = []
    if exams:
        for exam in exams:
            mr = {'id': exam.exid, 'title': exam.title, 'type': exam.type, 'klasses': json.loads(exam.cohorts),
                  'start': exam.start.strftime("%Y-%m-%d"), 'end': exam.end.strftime("%Y-%m-%d"),
                  'exclude': json.loads(exam.exclude_subjs)}
            if current_user.admin_type == 'teacher':
                mr['teacher_subjects'] = fetch_teacher_exam_subjects(exam.exid, json.loads(exam.exclude_subjs),
                                                                     json.loads(exam.cohorts))
            mr['publish_status'] = 1 if exam.publish_result_status != 'pending' else 0
            data.append(mr)
    print(data)
    return data


def fetch_teacher_exam_subjects(examina_id: int, excluded_subjects: list, exam_classes: list) -> list:
    """ Returns a list of subjects that will feature in the exam which have been assigned to user (teacher) """
    teacher_subjects = []
    for klass_id in exam_classes:
        get_klass = Cohorts.query.filter_by(cid=klass_id).first()
        if get_klass:
            for subj in get_klass.subjects:
                if subj.sid not in excluded_subjects and subj.subject_expert == current_user.id:
                    mr = {}
                    mr['id'] = subj.sid
                    mr['klass'] = subj.cohort_id
                    mr['title'] = subj.title
                    mr['examina_id'] = examina_id
                    # check if teacher has set exam for this subject, then fetch exam stats
                    mr['notification'] = fetch_subject_exam_stat(subj.sid, examina_id)
                    if result_exists(examina_id, subj.sid):
                        mr['result_exists'] = 1
                    else:
                        mr['result_exists'] = 0
                    teacher_subjects.append(mr)

    return teacher_subjects


def fetch_subject_exam_stat(subject_id: int, examina_id: int) -> dict:
    """ returns information about the exam question for the subject """
    question = Questions.query.filter_by(examina_id=examina_id, subject_id=subject_id).first()

    mr = {}
    if question:
        mr['review_request'] = "Review Not Requested" if question.approval_request == 0 else "Review Requested"
        mr['review_status'] = "Status: {}.".format(question.approval_status)
        if question.content:
            mr['question_count'] = "{} questions set".format(len(json.loads(question.content)))
        else:
            mr['question_count'] = "{} questions set".format(0)

    else:
        mr['review_request'] = "No question records found"
        mr['review_status'] = " "
        mr['question_count'] = " "

    return mr


def fetch_user_stat() -> dict:
    """ counts the number of different categories of users and returns the number as a dict"""
    mr = {'teachers': User.query.filter_by(admin_type='teacher').count(),
          'students': User.query.filter_by(admin_type='student').count(),
          'reviewers': User.query.filter_by(admin_type='reviewer').count()}

    return mr


def fetch_exam_skedule() -> list:
    """ prepares a timetable for all exams within an instance"""
    exams = db.session.query(Examina).filter(Examina.end > datetime.now()).order_by(Examina.start.desc())
    data = []
    if exams:
        group1 = []  # unique and has no date attr
        group2 = []
        for exam in exams:
            for quest in exam.questions:
                mr = {'day': quest.start.strftime('%A'), 'month': quest.start.strftime('%B'),
                      'start_time': quest.start.strftime('%I:%M:%S %p'), 'week': quest.start.strftime('%U'),
                      'end_time': quest.end.strftime('%I:%M:%S %p'), 'date': str(quest.start.date())}
                if mr not in group1:
                    group1.append(mr)
                mr2 = {'subj': quest.subject.title, 'skedule': mr, 'klas': quest.subject.cohort.classname}
                group2.append(mr2)

        if len(group1) > 0:
            for i in group1:
                subjs = []
                klas = []
                for x in group2:
                    if x['skedule'] == i:
                        subjs.append(x['subj'])
                        klas.append(x['klas'])
                MR = {'subjects': subjs, 'skedule': i, 'klasses': klas}
                data.append(MR)

    return data


def fetch_subject_exam_question(exam_id: int, subject_id: int) -> dict:
    """ fetches a teacher's exam question for a given subject """
    data = {}
    data["question_data"] = {}
    # fetch subject details
    subject = Subjects.query.filter_by(sid=subject_id).first()
    if subject:
        mrs = {}
        mrs["id"] = subject_id
        mrs["title"] = subject.title
        mrs["class_name"] = subject.cohort.classname
        mrs["class_id"] = subject.cohort.cid

        data["subject_data"] = mrs

    record = db.session.query(Questions).filter(Questions.examina_id == exam_id, Questions.subject_id == subject_id) \
        .first()
    if record:
        mr = {}
        mr["id"] = record.qid
        mr["start"] = myfunc.break_date_time_into_digits(record.start)
        mr["end"] = myfunc.break_date_time_into_digits(record.end)
        mr["instruction"] = record.instruction
        mr['content'] = []
        # check if there is question record
        if record.content:
            if len(json.loads(record.content)) > 0:
                mr['content'] = json.loads(record.content)
        data["question_data"] = mr

    return data


def fetch_review_items() -> list:
    """fetches items (questions and exam results) that have been requested for review"""
    data = []
    today = datetime.now()
    # fetch questions record for examina whose end date has not expired
    question = db.session.query(Questions.qid, Questions.approval_status, Examina.title, Examina.exid,
                                Questions.subject, Questions.content, Subjects.general_title,
                                Subjects.sid, Cohorts.classname, Cohorts.cid) \
        .filter(Examina.end > today, Questions.examina_id == Examina.exid,
                Questions.approval_request == 1, Subjects.sid == Questions.subject_id,
                Cohorts.cid == Subjects.cohort_id).all()

    if question:
        for quest in question:
            #  check if result is ready
            result = Result.query.filter_by(examina_id=quest.exid, cohort_id=quest.cid,
                                            subject_id=quest.sid).first()
            result_ready_for_review = False
            review_type = 'exam question'
            if result:
                if result.class_result.expert_approval != 'pending' and result.class_result.admin_approval == 'pending':
                    result_ready_for_review = True
                    review_type = 'exam result'
            #  either the question needs approval or the result is ready and needs admin approval
            if quest.approval_status == 'pending' or result_ready_for_review:
                mr = {}
                mr['id'] = result.rid if result_ready_for_review else quest.qid
                mr['title'] = quest.title
                mr['subject'] = quest.general_title
                mr['klass'] = quest.classname
                mr['type'] = review_type
                mr['class_result_id'] = result.class_result.crid if result_ready_for_review else 0
                mr['examina_id'] = quest.exid
                mr['subject_id'] = quest.sid
                mr['content'] = json.loads(quest.content)
                data.append(mr)

    return data


def fetch_today_exams() -> list:
    """fetches list of exams scheduled today for user"""
    data = []
    today = datetime.now()

    items = current_user.cohort
    if items and items.subjects and current_user.admin_type == 'student':
        for subj in items.subjects:
            subject_questions = subj.questions
            if subject_questions:
                for quest in subject_questions:
                    if quest.start.date() == today.date() and quest.approval_status == "approved" \
                            and quest.approval_request == 1:
                        mr = {}
                        mr['id'] = quest.qid
                        mr['title'] = quest.examina.title
                        mr['subject'] = quest.subject.general_title
                        mr['start_time'] = quest.start.strftime("%I:%M %p")
                        if quest.start > datetime.now():
                            mr['time_remaining'] = myfunc.get_time_duration_in_minutes(datetime.now(), quest.start)
                            mr['duration'] = myfunc.get_time_duration_in_minutes(quest.start, quest.end)
                        elif quest.start <= datetime.now() < quest.end:
                            mr['time_remaining'] = 0
                            mr['duration'] = myfunc.get_time_duration_in_minutes(datetime.now(), quest.end)
                        else:
                            mr['time_remaining'] = -1
                            mr['duration'] = 0
                        mr['end_time'] = quest.end.strftime("%I:%M %p")
                        if written_exam(quest.examina.exid, quest.subject.sid):
                            mr['written_exam'] = 'yes'
                        else:
                            mr['written_exam'] = 'no'
                        data.append(mr)

    return data


def fetch_exam_question(question_id: int) -> dict:
    """ fetches the question that the student is answering for the current exam """
    data = {}
    question = Questions.query.filter_by(qid=question_id).first()
    if question:
        data['instruction'] = question.instruction
        data['examina_id'] = question.examina.exid
        data['question_id'] = question.qid
        data['title'] = question.examina.title
        data['subject'] = question.subject.general_title
        data['klass'] = question.subject.cohort.classname
        data['start_time'] = question.start.strftime("%H:%M:%S")
        data['duration'] = myfunc.get_time_duration_in_minutes(question.start, question.end)
        data['content'] = []
        if question.content:
            content = json.loads(question.content)
            if len(content) > 0:
                count = 0
                for quest in content:
                    count += 1
                    mr = {}
                    mr['id'] = count
                    mr['question'] = quest['question']
                    mr['diagram'] = None
                    mr['answers'] = quest['options']
                    mr['correctAnswer'] = quest['answer']
                    data['content'].append(mr)
    return data


def written_exam(examina_id, subject_id):
    """ checks if user has written the paper or not"""
    check = Result.query.filter_by(user_id=current_user.id, examina_id=examina_id, subject_id=subject_id).count()
    if check > 0:
        return True
    return False


def result_exists(examina_id, subject_id):
    """ checks if result exists for the given subject for a particular examina """

    check = Result.query.filter_by(examina_id=examina_id, subject_id=subject_id).count()
    if check > 0:
        return True
    return False


def fetch_exam_info(examina_id, subject_id):
    """ returns details about the exam with the examina id"""
    data = {}
    info = Questions.query.filter_by(examina_id=examina_id, subject_id=subject_id).first()
    if info:
        data['examina_id'] = examina_id
        data['subject_id'] = subject_id
        data['title'] = info.examina.title
        data['class'] = info.subject.cohort.classname
        data['subject'] = info.subject.general_title

    return data


def summarize_result(results):
    """ generates a statistics for the result and ranks participants based on their score """
    summary = {}
    result_list = []
    if results:
        summary['participants'] = len(results)
        summary['passed'] = 0
        summary['failed'] = 0
        for result in results:
            mr = {}
            mr['id'] = result.user_id
            mr['name'] = "{} {} {}".format(result.user.sname, result.user.fname, result.user.oname)
            mr['class'] = result.cohort.classname
            mr['score'] = 0
            mr['script'] = {}
            if result.exam_script:
                script = json.loads(result.exam_script)
                mr['script'] = script
                mr['score'] = script['score']
                if float(script['score']) >= 40:
                    summary['passed'] += 1
                    mr['remarks'] = 'passed'
                else:
                    summary['failed'] += 1
                    mr['remarks'] = 'failed'

            result_list.append(mr)

        # sort list by score
        result_list = sorted(result_list, key=operator.itemgetter('score'))

    return result_list, summary


def fetch_results_for_review(examina_id: int, subject_id: int) -> dict:
    """ fetch results details for a particular subject """
    data = {}
    result = Result.query.filter_by(subject_id=subject_id, examina_id=examina_id).first()
    data["id"] = result.class_result.crid
    if current_user.admin_type == 'teacher':
        data["status"] = result.class_result.expert_approval
    elif current_user.admin_type == 'reviewer':
        data["status"] = result.class_result.admin_approval
    data["exam_info"] = fetch_exam_info(examina_id, subject_id)
    results = Result.query.filter_by(examina_id=examina_id, subject_id=subject_id).all()
    result_list, result_summary = summarize_result(results)
    data["result_summary"] = result_summary
    data["result_list"] = result_list
    return data
