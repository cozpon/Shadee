import React from "react";
import { StatusBar } from "react-native";
import { StackNavigator, TabNavigator, DrawerNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
// ...

import SecondScreen from "../views/SecondScreen";
import Logout from "../views/Logout";
import Feed from '../views/Feed';
import TargetSearch from '../views/TargetSearch';
import ShadeCamera from '../views/ShadeCamera';


export const Drawer = DrawerNavigator({
  Feed: {
    screen: Feed,
  },
  SecondScreen: {
    screen: SecondScreen,
  },
  Logout: {
    screen: Logout,
  }
});

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
  Feed: {
    screen: Drawer,
    navigationOptions: {
      tabBarLabel: "Feed",
      tabBarIcon: ({ tintColor }) =>
        <Icon name="ios-umbrella" size={30} color={tintColor} />
    }
  },
  // Logout: {
  //   screen: Logout,
  //   navigationOptions: {
  //     tabBarLabel: "Logout",
  //     tabBarIcon: ({ tintColor }) =>
  //       <Icon name="ios-partly-sunny" size={30} color={tintColor} />
  //   }
  // },
  TargetSearch: {
    screen: TargetSearch,
    navigationOptions: {
      tabBarLabel: "Select Target",
      tabBarIcon: ({ tintColor }) =>
        <Icon name="ios-body" size={30} color={tintColor} />
    }
  },
  Camera: {
    screen: ShadeCamera,
    navigationOptions: {
      tabBarLabel: "Record Shade",
      tabBarIcon: ({ tintColor }) =>
        <Icon name="ios-camera" size={30} color={tintColor} />
     }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e6e6e6',
    activeBackgroundColor: "#ffb6c1",
    inactiveTintColor: '#666',
    labelStyle: {
      fontSize: 12,
      padding: 0
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
    }, {
      headerMode: "none",
      mode: "modal", // not sure what this does
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      // sets routeName to signed in if "signed in" is true, else sets it to "signed out"
    }
  );
};