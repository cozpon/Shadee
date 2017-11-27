const axios = require('axios');

const LOAD_EMOJIS = 'LOAD_EMOJIS';

import { url } from '../lib/url';

export const loadEmojis = () => {
  return function(dispatch){
    return axios.get(`${url}emojis`)
    .then((emojis) => {
      dispatch({
        type: LOAD_EMOJIS,
        emojis: emojis.data
      });
    });
  }
}