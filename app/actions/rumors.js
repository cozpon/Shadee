const axios = require('axios');

export const LOAD_RUMORS = 'LOAD_RUMORS';
export const ADD_RUMOR = 'ADD_RUMOR';
export const EDIT_RUMOR = 'EDIT_RUMOR';

import { url } from '../lib/url';

export const loadRumors = () => {
  return function(dispatch){
    return axios.get(`${url}rumors`)
    .then((rumors) => {
      dispatch({
        type: LOAD_RUMORS,
        rumors: rumors.data
      });
    });
  }
}

export const addRumor = (rumor) => {
  return function(dispatch){
    return axios.post(`${url}rumors`, rumor)
    .then((newRumor) => {
      dispatch({
        type: ADD_RUMOR,
        rumor: newRumor.data
      });
    });
  }
}

export const editRumor = (newInfo) => {
  return function(dispatch){
    return axios.put(`${url}rumors/${newInfo.id}`, newInfo)
    .then((editedRumor) => {
      console.log(editedRumor);
      dispatch({
        type: EDIT_RUMOR,
        rumor: editedRumor.data
      });
    });
  }
}