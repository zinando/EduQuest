""" this module contains utility functions """
import re
import random
import time
from datetime import datetime


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
