""" this is the subject class module """

from models import Subjects
from functions import myfunctions as myfunc
from extensions import db


class SUBJECTS:
    """ creates instance of a subject """

    def __init__(self):
        """ initializes the class """
        pass

    def add_subject(self, data: dict):
        """ adds a new subject record to the database"""
        new = Subjects()
        new.subj_code = self.generate_subj_code()
        new.title = data['title'].title()
        new.general_title = data['general_title'].title()
        new.cohort_id = data['class']
        new.subject_expert = data['teacher']
        db.session.add(new)
        db.session.commit()
        return

    def generate_subj_code(self) -> str:
        """ generates random 8-digit numbers that are unique to the subject """
        def generate_random_code():
            """generates random code of 4-digits numbers"""
            code = "{}".format(myfunc.random_numbers(6))
            if Subjects.query.filter_by(subj_code=code).count() > 0:
                generate_random_code()
            return code

        return generate_random_code()
