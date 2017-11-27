import { combineReducers } from 'redux';

import messages from './messages';
import message from './message';
import users from './users';
import user from './user';
import emojis from './emojis';
import victim from './victim';
import rumors from './rumors';

export default combineReducers({
  messages,
  message,
  users,
  user,
  emojis,
  victim,
  rumors
});