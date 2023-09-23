"""This is the main api module"""

from flask import request
from appclasses.user_auth import UserAuth
from appclasses.userclass import USERCLASS
import json
from extensions import app, db, jwt
from flask_jwt_extended import jwt_required, get_jwt_identity, current_user
from models import User, Subjects, Cohorts
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
    # db.create_all()
    return json.dumps({"status": 1, "message": "Hello World"})


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

    if current_user is None or "SUPER_DASHBOARD" not in user_view:
        message = 'User does not have access privilege'
        return json.dumps({'status': 2, 'data': None, 'message': message, 'error': [message]})


    if user == "SUPER":
        if request.args.get("action") == "FETCH-EXAM-INSTANCES":
            data = resource.fetch_examina()
            return json.dumps({'status': 1, 'data': data, 'message': 'success!', 'error': [None]})

    if user == "STUDENT":
        pass

    if user == "TEACHER":
        pass

    if user == "REVIEWER":
        pass


@app.route("/admin_actions/<action>", methods=["GET", "POST"])
@jwt_required()
def admin_actions(action: str):
    """ this serves all resources associated with admin action menu """
    # db.create_all()
    if action == "manage_users":
        if request.args.get("action") == "FETCH-USERS":
            worker = USERCLASS()
            user_info = worker.fetch_users()
            return json.dumps({'status': 1, 'data': user_info, 'message': 'ok', 'error': None})
        if request.args.get("action") == "ADD-USER":
            data = request.get_json()
            auth = UserAuth('xhdgbc', data['password'], first_name=data['first_name'],
                            admin_type=data['admin_type'], user_class=data['user_class'],
                            other_names=data['other_names'], email=data['email'], surname=data['surname'])
            response = auth.validate_new_user_credentials()
            return json.dumps(response)

    elif action == "manage_subjects":
        if request.args.get('action') == 'FETCH-SUBJECTS':
            worker = resource.fetch_subjects()
            return json.dumps({'status': 1, 'data': worker, 'message': 'ok', 'error': None})
        if request.args.get("action") == "ADD-SUBJECT":
            data = request.get_json()
            try:
                Subjects(subj_code="{}".format(myfunc.random_numbers()), title=data['title'],
                         general_title=data['general_title'], subject_class=data['class']).add()
                db.session.commit()
                status = 1
                message = 'Subject added successfully'
                error = None
            except Exception as e:
                status = 2
                message = 'Operation was not successful'
                error = [str(e)]

            response = {'status': status, 'data': None, 'message': message, 'error': error}
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
            print(error)
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
            print(status)
            response = {'status': status, 'data': classList, 'message': message, 'error': error}
            return json.dumps(response)


if __name__ == "__main__":
    """main flask app"""
    app.run(debug=True, host='localhost', port=5000)
