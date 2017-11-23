import { SELECT_VICTIM } from '../actions/victims';

const initialState = {};

const victim = (state = initialState, action) => {
  switch(action.type){
    case SELECT_VICTIM:
      return Object.assign({}, action.victim);
    default:
      return state
  }
}

export default victim;