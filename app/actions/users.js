import Axios from 'axios';

import { url } from '../lib/url';

const register = `${url}auth/register`;
const login = `${url}auth/login`;
const logout = `${url}auth/logout`;
const forgot = `${url}auth/forgot`;
const reset = `${url}auth/reset`;
const editpass = `${url}auth/editpass`;
const editemail = `${url}auth/editemail`;

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FORGOT_PASS = 'FORGOT_PASS';
export const RESET_PASS = 'RESET_PASS';
export const EDIT_PASSWORD = 'EDIT_PASSWORD';
export const EDIT_EMAIL = 'EDIT_EMAIL';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_DETAIL_USERS = 'LOAD_DETAIL_USERS';
export const LOAD_USERS = 'LOAD_USERS';
export const DELETE_USER = 'DELETE_USER';

export const registerUser = (registerCreds) => {
  return (dispatch) => {
    return Axios.post(register, registerCreds)
    .then(newUser => {
      dispatch({
        type: REGISTER_USER,
        user: newUser.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const loginUser = (userCreds) => {
  return (dispatch) => {
    return Axios.post(login, userCreds)
    .then(user => {
      dispatch({
        type: LOGIN_USER,
        user: user.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        error: 'invalid user name or password'
      });
    });
  };
};

export const logoutUser = (user) => {
  return (dispatch) => {
    return Axios.get(logout)
    .then(response => {
      if(response.data.success) {
        dispatch({
          type: LOGOUT_USER,
          success: response.data.success
        });
      }
    })
    .catch((err) => {
      console.log('Logout failed. try again', err);
      return false;
      });
    }
  };


export const loadUsers = () => {
  return function(dispatch) {
    return Axios.get(`${url}users`).then((users) => {
      dispatch({
        type: LOAD_USERS,
        users: users.data
      });
    });
  }
}

export const loadDetailUsers = () => {
  return function(dispatch) {
    return Axios.get(`${url}users/all`).then((users) => {
      dispatch({
        type: LOAD_DETAIL_USERS,
        users: users.data
      });
    });
  }
}

export const loadUser = (id) => {
  return function(dispatch) {
    return Axios.get(`${url}users/${id}`).then((user) => {
      dispatch({
        type: LOAD_USER,
        user: user.data
      });
    });
  }
}

export const editPassword = (user) => {
  return (dispatch) => {
    return Axios.put(`${editpass}/${user}`, user)
    .then((editedUser) => {
      dispatch({
        type: EDIT_PASSWORD,
        user: editedUser.data
      });
    });
  }
}

export const editEmail = (user) => {
  return (dispatch) => {
    return Axios.put(`${editemail}/${user}`, user)
    .then((editedUser) => {
      dispatch({
        type: EDIT_EMAIL,
        user: editedUser.data
      });
    });
  }
}

export const forgotPassword = (userEmail) => {
  console.log("hitting");
  console.log(userEmail, "USEREMAIL)");
  return (dispatch) => {
    return Axios.post(forgot, userEmail)
    .then((response) => {
      dispatch({
        type: FORGOT_PASS,
        userDetails: response.data
      });
    })
    .then((response) => {
     response.json()
    .then((response) => {
    if(response.success === true){
    alert("Email Sent! Check Spam Filter If You Don't See It")
    .then(() => navigation.navigate("SignIn"));
    } else { return alert("Something wrent wrong!")
        }
      })
      .done()
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        error: 'something went wrong, please try again!'
      });
    });
  };
};


export const resetPassword = (password) => {
  return (dispatch) => {
    return Axios.put(`${reset}/${password.token}`, password)
    .then((response) => {
      dispatch({
        type: RESET_PASS,
        userDetails: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        error: 'something went wrong, please try again!'
      });
    });
  };
};