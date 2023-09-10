"""This is the main api module"""

from flask import request
from appclasses.user_auth import UserAuth
from functions import accesscontrol as access_func
import json
from extensions import app

@app.route("/", methods=["GET"])
def index():
    return "Hello World"


@app.route("/signup", methods=["POST"])
def signup() -> str:
    """ receives sign up request and converts the data into python dict then returns a response """
    data = request.get_json()
    auth = UserAuth(data['email'], data['password'], firstname=data['firstname'])
    response = auth.validate_new_user_credentials()
    return json.dumps(response)


@app.route("/login", methods=["POST"])
def login() -> str:
    """ receives login request and converts the data into python dict then returns a response """
    data = request.get_json()
    auth = UserAuth(data['userid'], data['password'])
    response = auth.authenticate_user()
    return json.dumps(response)


@app.route("/dashboard/<user>", methods=["POST"])
def dashboard(user: str):
    """ Implements the user dashboard requests"""
    data = request.get_json()
    if access_func.authentication()['status'] > 1:
        return json.dumps(access_func.authentication())

    if user == "SUPER":
        pass

    if user == "STUDENT":
        pass

    if user == "TEACHER":
        pass

    if user == "REVIEWER":
        pass


if __name__ == "__main__":
    """main flask app"""
    app.run(debug=True, host='localhost', port=5000)
