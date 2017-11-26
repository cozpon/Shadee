import React from "react";
import { StatusBar, View, Text, Image } from "react-native";
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
// ...
import Profile from "../views/Profile";
import Logout from "../views/Logout";
import Feed from '../views/Feed';
import TargetSearch from '../views/TargetSearch';
import ShadeCamera from '../views/ShadeCamera';

const DrawerContent = (props) => (
  <View>
    <View
      style={{
        backgroundColor: '#f50057',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }} >
      <Image source = {{uri: "https://lh6.googleusercontent.com/-GL6bIYM9Kbg/AAAAAAAAAAI/AAAAAAAAAH4/d8cbQE_W7IU/photo.jpg"}}>
      </Image>
      <Text style={{ color: 'white', fontSize: 30 }}>
        Header
      </Text>

    </View>
    <DrawerItems {...props} />
  </View>
)

export const Drawer = DrawerNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => <Icon name="ios-umbrella" size={24} color={tintColor} />
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => <Icon name="ios-body-outline" size={24} color={tintColor} />
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => <Icon name="ios-partly-sunny" size={24} color={tintColor} />
    }
  }
}, {
    contentComponent: DrawerContent,
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