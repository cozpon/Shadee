// handle all auth LOGIC in this

import { AsyncStorage } from "react-native";
// react-native's version of local storage

export const USER_KEY = "shade-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");
// set storage to hold key as TRUE

export const setStorage = (data) => AsyncStorage.setItem('data', JSON.stringify(data));
// set storage to hold user data

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);
//if user signs out, remove TRUE key

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};