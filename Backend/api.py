"""This is the main api module"""

from flask import request, session
from appclasses.user_auth import UserAuth
from appclasses.userclass import USERCLASS
from functions import accesscontrol as access_func
import json
from extensions import app, db, login_manager
from models import User


@login_manager.user_loader
def loader_user(user_id):
    return User.query.get(user_id)


@app.route("/", methods=["GET"])
def index():
    return json.dumps({"message": "Hello World"})


@app.route("/signup", methods=["POST"])
def signup() -> str:
    """ receives sign up request and converts the data into python dict then returns a response """
    data = request.get_json()
    auth = UserAuth(data['email'], data['password'], first_name=data['first_name'], admin_type=data['admin_type'],
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
def dashboard(user: str):
    """ Implements the user dashboard requests"""
    # data = request.get_json()
    if access_func.authentication()['status'] > 1:
        return json.dumps(access_func.authentication())

    if user == "SUPER":
        if request.args.get("action") == "FETCH-EXAM-INSTANCES":
            pass

    if user == "STUDENT":
        pass

    if user == "TEACHER":
        pass

    if user == "REVIEWER":
        pass


@app.route("/admin_actions/<action>", methods=["GET", "POST"])
def admin_actions(action: str):
    """ this serves all resources associated with admin action menu """
    db.create_all()
    if access_func.authentication()['status'] > 1:
        return json.dumps(access_func.authentication())
    if action == "manage_users":
        if access_func.have_access(session['admin_type'], 'MANAGE_USERS')['status'] > 1:
            return access_func.have_access(session['admin_type'], 'MANAGE_USERS')
        if request.args.get("action") == "FETCH-USERS":
            worker = USERCLASS()
            user_info = worker.fetch_users()
            return json.dumps({'status': 1, 'data': user_info, 'message': 'ok', 'error': None})

if __name__ == "__main__":
    """main flask app"""
    app.run(debug=True, host='localhost', port=5000)
