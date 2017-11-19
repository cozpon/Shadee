import { combineReducers } from 'redux';

import messages from './messages';
import message from './message';
import users from './users';
import user from './user';

export default combineReducers({
  messages,
  message,
  users,
  user
});