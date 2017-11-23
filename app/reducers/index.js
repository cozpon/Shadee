import { combineReducers } from 'redux';

import messages from './messages';
import message from './message';
import users from './users';
import user from './user';
import emojis from './emojis';
import victim from './victim';

export default combineReducers({
  messages,
  message,
  users,
  user,
  emojis,
  victim
});