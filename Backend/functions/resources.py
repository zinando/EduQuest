""" this module contains functions that provide resources to clients """
from models import User, Subjects, Cohorts, Examina
from extensions import db
from flask import session


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
        mr['subj_code'] = subj.subj_code
        mr['title'] = subj.title
        data.append(mr)

    return data


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


def fetch_examina() -> list:
    """ fetches all examination instances """
    exams = Examina.query.order_by(Examina.start.desc())
    data = []
    if exams:
        for exam in exams:
            mr = {}
            mr['title'] = exam.title
            mr['type'] = exam.type
            mr['classes'] = ''  # list of class names
            mr['start_time'] = exam.start
            mr['end_time'] = exam.end
            data.append(mr)

    return data
