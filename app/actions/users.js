export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const EDIT_USER = 'EDIT_USER';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_DETAIL_USERS = 'LOAD_DETAIL_USERS';
export const LOAD_USERS = 'LOAD_USERS';
export const DELETE_USER = 'DELETE_USER';

const axios = require('axios');

export const registerUser = (user) => {
  return function(dispatch) {
    return axios.post('http://localhost:8080/api/users', user).then((newUser) => {
      dispatch({
        type: REGISTER_USER,
        user: newUser.data
      });
    });
  }
}

export const loginUser = (user) => {
  return function(dispatch) {
    return axios.post('http://localhost:8080/users/login', user).then((user) => {
      dispatch({
        type: LOGIN_USER,
        user: user.data
      });
    });
  }
}

export const logoutUser = (user) => {
  return function(dispatch) {
    return axios.get('http://localhost:8080/users/logout').then((response) => {
      dispatch({
        type: LOGOUT_USER,
        response: data.response
      });
    });
  }
}

export const loadUsers = () => {
  return function(dispatch) {
    return axios.get('http://localhost:8080/api/users').then((users) => {
      dispatch({
        type: LOAD_USERS,
        users: data.users
      });
    });
  }
}

export const loadDetailUsers = () => {
  return function(dispatch) {
    return axios.get('http://localhost:8080/api/users/all').then((users) => {
      dispatch({
        type: LOAD_DETAIL_USERS,
        users: data.users
      });
    });
  }
}

export const loadUser = (id) => {
  return function(dispatch) {
    return axios.get(`http://localhost:8080/api/users/${id}`).then((user) => {
      dispatch({
        type: LOAD_USER,
        user: user.data
      });
    });
  }
}

export const editUser = (user) => {
  return function(dispatch) {
    return axios.put(`http://localhost:8080/api/users/${user.id}`).then((editedUser) => {
      dispatch({
        type: EDIT_USER,
        user: editedUser.data
      });
    });
  }
}