import React from "react";
import { StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
// ...
import FirstScreen from "../views/FirstScreen";
import SecondScreen from "../views/SecondScreen";
import Feed from '../views/Feed';


export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  }
});

export const SignedIn = TabNavigator({
  FirstScreen: {
    screen: FirstScreen,
    navigationOptions: {
      tabBarLabel: "FirstScreen",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" size={30} color={tintColor} />
      )
    }
  },
  SecondScreen: {
    screen: Feed,
    navigationOptions: {
      tabBarLabel: "SecondScreen",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="user" size={30} color={tintColor} />
      )
    }
  }
});

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal", // not sure what this does
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      // sets routeName to signed in if "signed in" is true, else sets it to "signed out"
    }
  );
};