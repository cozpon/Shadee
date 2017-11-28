import React from "react";
import { StatusBar, View, Text, Image } from "react-native";
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import DrawerContent from "../views/Sidebar"
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
// ...
import HowTo from "../views/HowTo";
//import SecondScreen from "../views/SecondScreen";
import Profile from "../views/Profile";
import Logout from "../views/Logout";
import Feed from '../views/Feed';
import RumorMill from '../views/RumorMill';
import TargetSearch from '../views/TargetSearch';
import ShadeCamera from '../views/ShadeCamera';
import Terms from '../views/TermsOfService';

export const Drawer = DrawerNavigator({
  Feed: {
    screen: Feed,
    id: 0,
    bgcolor: '#698FB2'
  },
  Logout: {
    screen: Logout,
    id: 2,
    bgcolor: '#9B91BA'
  },
  Profile: {
    screen: Profile,
  },
  RumorMill: {
    screen: RumorMill,
  },
  HowTo: {
    screen: HowTo,
  }
}, {
  contentComponent: DrawerContent,
  drawerWidth: 250
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
  },
  Terms: {
    screen: Terms,
    navigationOptions: {
      title: "Terms"
    }
  },
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
    activeTintColor: '#FFF',
    activeBackgroundColor: '#578992',
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