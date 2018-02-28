export const SELECT_VICTIM = 'SELECT_VICTIM';

export const selectVictim = (victim) => {
  return function(dispatch){
    dispatch({
      type: SELECT_VICTIM,
      victim: victim
    });
  }
}