"""This is the user class module"""
from models import User
from . import db
from werkzeug.security import generate_password_hash

class USERCLASS:
    """creates an instance of a user"""
    def __init__(self, user_id: int):
        """initializes a user instance"""
        self.user_exists = User.query.filter_by(userid=user_id).first()

    def get_user(self) -> dict:
        """return a user object if user exists, otherwise it returns None"""
        if not self.user_exists:
            return {}
        user = self.user_exists
        info = {}
        info['user_id'] = user.id
        info['userid'] = user.userid
        info['first_name'] = user.fname
        info['surname'] = user.sname
        info['other_names'] = user.oname
        info['email'] = user.email
        info['full_name'] = "{} {} {}".format(user.sname, user.fname, user.oname)
        info['admin_type'] = user.admin_type
        info['user_class'] = user.linkcohort
        #info['subjects'] = [x for x in user.courses]

        return info

    def add_user(self, data: dict) -> dict:
        """adds a user object to the database"""
        new = User()
        new.userid = data['userid']
        new.fname = data['firstname']
        new.sname = data['surname']
        new.oname = data['othernames']
        new.email = data['email']
        new.cohort_id = data['cohort'] if 'cohort' in data.keys() else 0
        new.password = generate_password_hash(data['password'])
        new.admin_type = data['admin_type']
        new.createdby = session['user_id']
        db.session.add(new)
        db.session.commit()

        return {'status': 1, 'message': 'user added successfully.'}
