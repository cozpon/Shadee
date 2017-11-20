import { LOAD_USER,
         EDIT_USER,
         LOGIN_USER,
         LOGOUT_USER
       } from '../actions/users';

const initialState = {};

const user = (state = initialState, action) => {
  switch(action.type){
    case LOAD_USER:
      return Object.assign({}, state, action.user);

    case EDIT_USER:
      return Object.assign({}, state, action.user);

    case LOGIN_USER:
      return Object.assign({}, state, action.user);

    case LOGOUT_USER:
      return Object.assign({}, state, action.user);
  }
}