const axios = require('axios');

const LOAD_EMOJIS = 'LOAD_EMOJIS';

export const loadEmojis = () => {
  return function(dispatch){
    return axios.get('http://localhost:8080/api/emojis')
    .then((emojis) => {
      dispatch({
        type: LOAD_EMOJIS,
        emojis: emojis.data
      });
    });
  }
}