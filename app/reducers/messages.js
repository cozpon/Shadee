import { LOAD_MESSAGES,
          ADD_MESSAGE,
          EDIT_MESSAGE,
          DELETE_MESSAGE,
          VOTE_ON_MESSAGE
          } from '../actions/messages';

const initialState = [];

const messages = (state = initialState, action) => {
  switch(action.type){
    case LOAD_MESSAGES:
      return [ ...action.messages ];
    case ADD_MESSAGE:
      return [ ...state, action.message ];
    case EDIT_MESSAGE:
      let index = state.findIndex((message) => {
        return message.id === action.message.id
      });
      return [ ...(state.slice(0, index)), action.message, ...(state.slice((index + 1), state.length)) ];
    case VOTE_ON_MESSAGE:
      let position = state.findIndex((message) => {
        return message.id === action.message.id
      });
      return [ ...(state.slice(0, position)), action.message, ...(state.slice((position + 1), state.length)) ];
    case DELETE_MESSAGE:
      let deletedRemoved = state.filter((message) => {
        return message.id !== action.message.id;
      });
      return [ ...deletedRemoved ];
    default:
      return state
  }
}

export default messages;