import { combineReducers } from 'redux';

let initialState = { WHATEVER: [], loading: true }; // set loading to true initially

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case WHATEVER_CASE:
            state = Object.assign({}, state, { WHATEVER: action.WHATEVER, loading: false });
            return state;
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    Reducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;