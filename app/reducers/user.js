import { LOAD_USER,
         LOGIN_USER,
         LOGOUT_USER,
         EDIT_EMAIL,
         EDIT_PASSWORD,
         ERROR
       } from '../actions/users';

const initialState = {};

const user = (state = initialState, action) => {
  switch(action.type){
    case LOAD_USER:
      return Object.assign({}, state, action.user);

    case LOGIN_USER:
      return Object.assign({}, state, action.user);

    case LOGOUT_USER:
      return Object.assign({}, state, action.user);

    case EDIT_PASSWORD:
      return Object.assign({}, state, action.user);

    case EDIT_EMAIL:
      return Object.assign({}, state, action.user);

    case ERROR:
      return Object.assign({}, state, action.type);


    default:
      return state;
  }
};

export default user;