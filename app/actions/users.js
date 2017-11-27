import Axios from 'axios';

import { url } from '../lib/url';

const register = `${url}auth/register`;
const login = `${url}auth/login`;
const logout = `${url}auth/logout`;

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const EDIT_USER = 'EDIT_USER';
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
  console.log(url);
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

export const editUser = (user) => {
  return function(dispatch) {
    return Axios.put(`${url}users/${user.id}`).then((editedUser) => {
      dispatch({
        type: EDIT_USER,
        user: editedUser.data
      });
    });
  }
}