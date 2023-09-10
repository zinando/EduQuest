"""this is the user authentication module"""
from flask import session
from extensions import db
from models import User
from werkzeug.security import check_password_hash
from appclasses.userclass import USERCLASS
from flask_login import login_user
from functions import myfunctions as myfunc


def generate_userid(surname: str) -> str:
    """ attaches a random 4-digit code to surname to form userid
        ensures userid is unique
    """

    def generate_random_code():
        """generates random code of 4-digits numbers"""
        code = myfunc.rando_numbers(4)
        userid = "{}{}".format(surname, code)
        if User.query.filter_by(userid=userid).count() > 0:
            generate_random_code()
        return userid

    return generate_random_code()


class UserAuth:
    """authenticates user, creates user session and returns user object"""

    def __init__(self, userid: str, password: str, **kwargs):
        """initialises user"""
        self.userid = userid
        self.password = password
        self.auth_errors = []
        self.user_data = kwargs

    def user_exists(self) -> bool:
        """ checks if there is a match for the userid and password
            returns True if there is match, otherwise false
        """
        user = db.session.query(User).filter((User.userid == self.userid) | (User.email == self.userid)).first()
        if not (user and check_password_hash(user.password, self.password)):
            self.auth_errors.append("Wrong userid and/password")
            return False
        return True

    def is_active(self) -> bool:
        """Returns true if user is activated, otherwise false"""
        user = db.session.query(User).filter((User.userid == self.userid) | (User.email == self.userid)).first()
        if not user.activated:
            self.auth_errors.append("User account is not active")
        return True

    def is_not_blocked(self) -> bool:
        """returns true if user not blocked, otherwise false"""
        user = db.session.query(User).filter((User.userid == self.userid) | (User.email == self.userid)).first()
        if user.block_stat:
            self.auth_errors.append("User is banned from using this portal")
            return False
        return True

    def authenticate_user(self) -> dict:
        """ verifies that user satisfies all authentication protocols
            creates a session for the user
            returns user object
        """
        if not (self.is_not_blocked() and self.is_active() and self.user_exists()):
            return {'status': 2, 'message': 'authentication failed', 'errors': self.auth_errors, 'data': None}

        user = db.session.query(User).filter((User.userid == self.userid) | (User.email == self.userid)).first()
        login_user(user)
        user_class = USERCLASS(user.id)
        user_info = user_class.get_user()
        session.update(user_info)

        return {'status': 1, 'data': user_info, 'message': 'login was successful',  'errors': None}

    def validate_new_user_credentials(self) -> dict:
        """ validates password strength for new user and check that userid is unique """
        text = ""
        user = db.session.query(User).filter((User.userid == self.userid) | (User.email == self.userid)).first()
        if user:
            return {'status': 2, 'message': 'userid already exists.', 'error': ['userid already exists.']}

        check_password = myfunc.check_password_strength(self.password)
        if check_password['status'] > 1:
            return check_password
        data = {}
        user_info = self.user_data
        if user_info['admin_type'] != 'super':
            data['userid'] = generate_userid(user_info['surname'])
            data['cohort'] = user_info['cohort']
            text = " Userid: {}".format(data['userid'])
        else:
            data['userid'] = self.userid
        data['firstname'] = user_info['firstname'].title()
        data['surname'] = user_info['surname'].title()
        data['othernames'] = user_info['othernames'].title()
        data['email'] = user_info['email']
        data['password'] = self.password
        data['admin_type'] = user_info['admin_type']

        user_class = USERCLASS(0)
        response = user_class.add_user(data)
        response['message'] += text
        return response
