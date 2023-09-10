""" this module contains methods that control access to this app's resources """

from flask_login import current_user


def user_access_view() -> dict:
    """ defines various access resources for different users """
    resource = {
        "super": ["SUPER_DASHBOARD", "SET_EXAMS", "TAKE_EXAMS", "PUBLISH_RESULTS", "REVIEW_QUESTIONS",
                  "SET_QUESTIONS", "MANAGE_USERS",
                  "MANAGE_CLASSES", "MANAGE_SUBJECTS", "REVIEW_RESULTS", "VIEW_RESULTS"],
        "student": ["STUDENT_DASHBOARD", "TAKE_EXAMS", "VIEW_RESULTS"],
        "teacher": ["SET_QUESTIONS", "REVIEW_QUESTIONS", "REVIEW_RESULTS", "VIEW_RESULTS"],
        "reviewer": ["REVIEW_QUESTIONS", "REVIEW_RESULTS", "PUBLISH_RESULTS", "VIEW_RESULTS"]
    }

    return resource


def authentication() -> dict:
    """ checks if user is authenticated """
    if not current_user.is_authenticated:
        message = 'user is not authorized to access this resource'
        error = ['user is not authenticated.']
        return {'status': 404, 'data': None, 'message': message, 'error': error}

    return {'status': 1, 'data': None, 'message': 'Ok', 'error': None}


def have_access(admin_type: str, access_point: str) -> dict:
    """ determines if a user has access with an access_point """
    access = user_access_view()
    if access_point not in access[admin_type]:
        message = 'user is not authorized to access this resource'
        error = ['user does not have privilege to access this resource.']
        return {'status': 404, "data": None, 'message': message, 'error': error}

    return {'status': 1, 'data': None, 'message': 'Ok', 'error': None}


