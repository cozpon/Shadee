import {
  LOAD_RUMORS,
  ADD_RUMOR,
  EDIT_RUMOR,
  FLAG_RUMOR
  } from '../actions/rumors';

const initialState = [];

const rumors = (state = initialState, action) => {
  switch(action.type){
    case LOAD_RUMORS:
      return [ ...action.rumors ];
    case ADD_RUMOR:
      return [ ...state, action.rumor ];
    case EDIT_RUMOR:
      let index = state.findIndex((rumor) => {
        return rumor.id === action.rumor.id;
      });
      return [ ...(state.slice(0, index)), action.rumor, ...(state.slice((index + 1), state.length)) ];
    case FLAG_RUMOR:
            console.log("HERE REDUCER");
      let hideFlagged = state.filter((rumor) => {

        return rumor.id !== action.rumor.id;
      });
      return [ ...hideFlagged ];
    default:
      return state;
  }
};

export default rumors;