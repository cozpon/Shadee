import { LOAD_USERS,
         LOAD_DETAIL_USERS,
         REGISTER_USER,
         EDIT_USER
         } from '../actions/users';

const initialState = [];

const users = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_USERS:
      return [...action.users];

    case LOAD_DETAIL_USERS:
      return [...action.users];

    case REGISTER_USER:
      return [...state, action.user];

    case EDIT_USER:
      let users = state.filter((user) => {
        return user.id !== Number(action.user.id)
      });
      return [...users, action.user];

    default:
      return state
  }
}

export default users;