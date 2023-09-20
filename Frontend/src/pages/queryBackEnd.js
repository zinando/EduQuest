import validator from 'validator';

export default function queryBackEnd(url, req_data = {}, action = '', method = "POST") {
  const options = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req_data),
  };
  if (sessionStorage.getItem('auth_token')) {
    options.headers.Authorization = 'Bearer '+ sessionStorage.getItem('auth_token');
  }

  return fetch(`http://localhost:5000${url}?action=${action}`, options)
    .then((res) => {
      return res.json();
    })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.error('Error sending request: ', error);
      return {
        'status': 2,
        'data': [],
        'message': 'error sending request',
        'error': [error.message]
      };
    });
}


export function validate(value) {
  
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            return {'status': 1, 'message': 'password is strong!'};
        } else {
            return {'status': 2, 'message': 'password is Not strong'};
        }
    }

export function setSession(info) {
  // myStore = sessionStorage();
  if (info.auth_token) {

    sessionStorage.setItem('auth_token', info.auth_token);
    sessionStorage.setItem('userPerm', JSON.stringify(info.user_perm));
    const userData = {
      userId: info.data.userid,
      firstName: info.data.first_name,
      lastName: info.data.surname,
      email: info.data.email,
      otherNames: info.data.other_names,
      fullName: info.data.full_name,
      adminType: info.data.admin_type
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));

  }
    
}

export function userInfo () {
  if (sessionStorage.getItem('userData')) {
    return JSON.parse(sessionStorage.getItem('userData'));
  }
  return {};
}

export function checkUserPermission (privilege) {  
  
   const token = sessionStorage.getItem('auth_token');
   const perm = JSON.parse(sessionStorage.getItem('userPerm'));
   
    if(!token){
        location.href = '/login';
    } else if (!perm.includes(privilege))
    {
      return  '403 Forbidden!';
    }
}


export function logOutUser () {
  sessionStorage.clear();
  location.href= '/login';
}

// Function for adding a class
export function addClass(className) {
  const url = "/admin_actions/manage_classes";
  const action = "ADD-CLASS";
  const req_data = { class_name: className };

  return queryBackEnd(url, req_data, action);
}

// Function to add a subject
export function addSubject(title, generalTitle, subjectClass) {
  const url = "/admin_actions/manage_subjects";
  const action = "ADD-SUBJECT";
  const req_data = {
    title: title,
    general_title: generalTitle,
    class: subjectClass,
  };

  return queryBackEnd(url, req_data, action);
}

// Function to add a user
export function addUser(first_name, surname, other_names, admin_type, password, email, user_class) {
  const req_data = {
    first_name: first_name,
    surname: surname,
    other_names: other_names,
    admin_type: admin_type,
    password: password,
    email: email,
    user_class: user_class
  };

  return queryBackEnd('/admin_actions/manage_users', req_data, 'ADD-USER');
}
