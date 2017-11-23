import Axios from 'axios';

const register = 'http://localhost:8080/api/auth/register';
const login = 'http://localhost:8080/api/auth/login';
const logout = 'http://localhost:8080/api/auth/logout';

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
  return function(dispatch) {
    return Axios.get('http://localhost:8080/api/users').then((users) => {
      dispatch({
        type: LOAD_USERS,
        users: data.users
      });
    });
  }
}

export const loadDetailUsers = () => {
  return function(dispatch) {
    return Axios.get('http://localhost:8080/api/users/all').then((users) => {
      dispatch({
        type: LOAD_DETAIL_USERS,
        users: data.users
      });
    });
  }
}

export const loadUser = (id) => {
  return function(dispatch) {
    return Axios.get(`http://localhost:8080/api/users/${id}`).then((user) => {
      dispatch({
        type: LOAD_USER,
        user: user.data
      });
    });
  }
}

export const editUser = (user) => {
  return function(dispatch) {
    return Axios.put(`http://localhost:8080/api/users/${user.id}`).then((editedUser) => {
      dispatch({
        type: EDIT_USER,
        user: editedUser.data
      });
    });
  }
}