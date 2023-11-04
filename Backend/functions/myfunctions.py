""" this module contains utility functions """
import re
import random
import time
from datetime import datetime
import operator


def check_password_strength(password: str) -> dict:
    """validates password for certain criteria """
    error = []
    special = '[@_!#$%^&*()<>?/\|}{~:]'
    if len(password) < 8:
        error.append("Password cannot be less than 8 characters ")
    if re.search('[0-9]', password) is None:
        error.append("Password must include at least one number!")
    if re.search("[a-zA-Z]", password) is None:
        error.append("Password must include at least one letter!")
    if re.search('[A-Z]', password) is None:
        error.append("Password must include at least one UPPERCASE letter!")
    if re.search('[a-z]', password) is None:
        error.append("Password must include at least one LOWERCASE letter!")
    if (re.compile(special).search(password) == None):
        error.append("Password must include at least one special character: {}".format(special))
    if len(error) > 0:
        return {'status': 2, "message": "Password Not Ok", 'error': error}
    return {"status": 1, "message": "Password Ok", "error": []}


def random_numbers(number_length: int = 8) -> str:
    """ generates random numbers of number_length digits """
    my_date = datetime.now()
    tup = my_date.timetuple()
    myne = str(time.mktime(tup))

    numbers = myne[:10]
    return ''.join(random.choice(numbers) for i in range(number_length))


def break_date_time_into_digits(date_time) -> dict:
    """accepts datetime object and return a dictionary of datetime content in digits"""
    data = {}
    try:
        data["yea"] = date_time.year
        data["mon"] = date_time.month
        data["day"] = date_time.day
        data["hou"] = date_time.hour
        data["min"] = date_time.minute
        data["sec"] = date_time.second
    except AttributeError:
        data["yea"] = 0
        data["mon"] = 0
        data["day"] = 0
        data["hou"] = 0
        data["min"] = 0
        data["sec"] = 0

    return data


def get_time_duration_in_minutes(start, end) -> int:
    """ returns the difference between two datetimes in minutes """

    try:
        diff = end - start
        difference = divmod(diff.total_seconds(), 60)[0]
    except:
        difference = 0

    return int(difference)


def rank_the_objects(object_list: list, sort_by) -> list:
    """ sorts a list of dictionaries by a given key """
    data = []
    if len(object_list) > 0:
        new_list = sorted(object_list, key=operator.itemgetter(sort_by), reverse=True)
        count = 0
        for item in new_list:
            count += 1
            mr = {}
            mr['id'] = item['id']
            mr[sort_by] = item[sort_by]
            mr['rank'] = count
            data.append(mr)

    return data


def get_remarks(score) -> str:
    """determines if a given score meets the passing requirements or not"""
    if float(score) >= 40:
        return "Passed"

    return "Failed"
