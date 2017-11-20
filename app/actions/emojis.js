const axios = require('axios');

const LOAD_EMOJIS = 'LOAD_EMOJIS';

export const loadEmojis = () => {
  return function(dispatch){
    return axios.get('/api/emojis')
    .then((emojis) => {
      dispatch({
        type: LOAD_EMOJIS,
        emojis: emojis.data
      });
    });
  }
}