""" this module contains functions that provide resources to clients """
from models import User, Subjects, Cohorts, Examina
from extensions import db
from datetime import datetime
import json
import calendar


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
        print(subj.cohort_id)
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
        print(user.cohort_id)
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
                  'start': exam.start.strftime("%Y-%m-%d"), 'end': exam.end.strftime("%Y-%m-%d"), 'exclude': json.loads(exam.exclude_subjs)}
            data.append(mr)

    return data


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
