"""This is the db models module"""
from extensions import db, app
from sqlalchemy.sql import func
from sqlalchemy.dialects.mysql import ENUM
from flask_login import UserMixin
from flask_jwt_extended import create_access_token
import datetime


class User(UserMixin, db.Model):
    """User class"""
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(45), nullable=False, unique=True)
    cohort_id = db.Column(db.Integer, db.ForeignKey("student_class.cid"))
    fname = db.Column(db.String(50), nullable=False)
    sname = db.Column(db.String(50), nullable=False)
    oname = db.Column(db.String(225), nullable=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(225), nullable=False)
    admin_type = db.Column(db.String(45), ENUM("super", "reviewer", "teacher", "student"), default="user")
    created = db.Column(db.DateTime, default=func.now())
    createdby = db.Column(db.Integer, nullable=False)
    block_stat = db.Column(db.Integer, nullable=False, default=0)
    passresetcode = db.Column(db.String(255), nullable=True)
    last_login = db.Column(db.DateTime, default=func.now())
    last_password_reset = db.Column(db.String(50), nullable=True)
    activated = db.Column(db.Integer, default=0)
    activatecode = db.Column(db.String(255), nullable=True)
    last_activation_code_time = db.Column(db.DateTime(), nullable=True)
    results = db.relationship("Result", backref="user")


    def __str__(self):
        return "{} {} {} class {}".format(self.userid, self.sname, self.fname, self.cohort_id)

    def encode_auth_token(self, user):
        """
        Generates the Auth Token
        :return: dictionary
        """
        try:
            access_token = create_access_token(identity=user)
            return {'status': 1, 'token': access_token, 'error': None}
        except Exception as e:
            return {'status': 2, 'token': None, 'error': [e]}
    

class Cohorts(db.Model):
    """This is the student class model"""
    __tablename__ = "student_class"
    cid = db.Column(db.Integer, primary_key=True)
    classname = db.Column(db.String(50), nullable=False, unique=True)
    reg_date = db.Column(db.DateTime(), default=func.now())
    subjects = db.relationship("Subjects", backref="cohort")
    students = db.relationship("User", backref="cohort")
    results = db.relationship("Result", backref="cohort")


class Subjects(db.Model):
    """This is school subjects model"""
    __tablename__ = "subjects"
    sid = db.Column(db.Integer, primary_key=True)
    subj_code = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(20), nullable=False)
    general_title = db.Column(db.String(20), nullable=False)
    cohort_id = db.Column(db.Integer, db.ForeignKey('student_class.cid'), nullable=False)
    subject_expert = db.Column(db.Integer, nullable=True)
    reg_date = db.Column(db.DateTime(), default=func.now())
    questions = db.relationship("Questions", backref="subject")
    results = db.relationship("Result", backref="subject")

class Questions(db.Model):
    """This is the model for sessional exam questions"""
    __tablename__ = "questions"
    qid = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.sid'), nullable=False)
    examina_id = db.Column(db.Integer, db.ForeignKey('examina.exid'), nullable=False)
    content = db.Column(db.String(625), nullable=True)
    approval_request = db.Column(db.Integer, default=0)
    approval_status = db.Column(db.String(22), default="pending")


class Examina(db.Model):
    """This is the model for session examination instance"""
    __tablename__ = "examina"
    exid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(25))  # e.g test,examination
    cohorts = db.Column(db.String(625), nullable=False)
    start = db.Column(db.DateTime(), nullable=False)
    end = db.Column(db.DateTime(), nullable=False)
    reg_date = db.Column(db.DateTime(), default=func.now())
    questions = db.relationship("Questions", backref="examina")
    results = db.relationship("Result", backref="examina")


class ClassResult(db.Model):
    """This model organizes results by class"""
    __tablename__ = "class_result"
    crid = db.Column(db.Integer, primary_key=True)
    session_code = db.Column(db.String(25), nullable=False)
    cohort = db.Column(db.Integer, nullable=True)
    expert_approval = db.Column(db.String(20), ENUM('pending', 'approved'), default='pending')
    admin_approval = db.Column(db.String(20), ENUM('pending', 'approved'), default='pending')
    admin_action = db.Column(db.String(20), ENUM('canceled', 'released'), default='released')
    publish_date = db.Column(db.DateTime())
    results = db.relationship("Result", backref="class_result")


class Result(db.Model):
    """This model organizes results by subject"""
    __tablename__ = "result"
    rid = db.Column(db.Integer, primary_key=True)
    classresult_id = db.Column(db.Integer, db.ForeignKey("class_result.crid"))
    examina_id = db.Column(db.Integer, db.ForeignKey("examina.exid"))
    cohort_id = db.Column(db.Integer, db.ForeignKey("student_class.cid"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    subject_id = db.Column(db.Integer, db.ForeignKey("subjects.sid"))
    admin_action = db.Column(db.String(20), ENUM('seized', 'released'), default='released')
    reg_date = db.Column(db.DateTime(), default=func.now())

