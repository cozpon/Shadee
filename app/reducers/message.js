import { LOAD_MESSAGE } from '../actions/messages';

const initialState = [];

const message = (state = initialState, action) => {
  switch(action.type){
    case LOAD_MESSAGE:
      return [ ...action.message ];
    default:
      return state
  }
}

export default message;