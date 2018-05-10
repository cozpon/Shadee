const axios = require('axios');

export const LOAD_RUMORS = 'LOAD_RUMORS';
export const ADD_RUMOR = 'ADD_RUMOR';
export const EDIT_RUMOR = 'EDIT_RUMOR';
export const FLAG_RUMOR = 'FLAG_RUMOR';

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
  };
};

export const addRumor = (rumor) => {
  console.log(rumor, "RUMOR");
  return function(dispatch){
    return axios.post(`${url}rumors`, rumor)
    .then((newRumor) => {
      dispatch({
        type: ADD_RUMOR,
        rumor: newRumor.data
      });
    });
  };
};

export const editRumor = (newInfo) => {
  console.log(newInfo, "EDITRUMOR");
  return function(dispatch){
    return axios.put(`${url}rumors/${newInfo.id}`, newInfo)
    .then(editedRumor => {
      console.log(editedRumor);
      dispatch({
        type: EDIT_RUMOR,
        rumor: editedRumor.data
      });
    });
  };
};

//not sure what we're making/naming the database side as
export const flagRumor = (flaggedRumor) => {
  console.log(flaggedRumor, "flaggedRumor actions");
  return function(dispatch){
    return axios.put(`${url}rumors/${flaggedRumor.id}/inappropriate`, flaggedRumor)
    .then(rumor => {
      console.log(rumor.data, 'FLAGGED RUMOR actions');
      dispatch({
        type: FLAG_RUMOR,
        rumor: rumor.data
      });
    });
  };
};