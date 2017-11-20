import { LOAD_EMOJIS } from '../actions/emojis';

const initialState = [];

const emojis = (state = initialState, action) => {
  switch(action.type){
    case LOAD_EMOJIS:
      return [...action.emojis];

    default:
      return state
  }
}

export default emojis;