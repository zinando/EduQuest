"""This is the main api module"""
import json

from flask import Flask, request, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, logout_user
from flask_migrate import Migrate
from appclasses.user_auth import UserAuth
import json

app = Flask(__name__)
app.config["SECRETE_KEY"] = "xm*ms'hek$woan348n9Dkb%diCnmi3n@ij+3mWhr83nI3ni"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eduquest.sqlite'

db = SQLAlchemy(app)
login_manager = LoginManager(app)
migrate = Migrate(app, db)


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


if __name__ == "__main__":
    """main flask app"""
    app.run(debug=True, host='localhost', port=5000)
