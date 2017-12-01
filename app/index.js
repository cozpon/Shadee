import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createRootNavigator } from "./config/authrouter";
import { isSignedIn } from "./auth";
import configureStore from './store';
import { View } from 'react-native';
const store = configureStore()

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("Oops! Something broked"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    const Layout = createRootNavigator(signedIn);
    if(checkedSignIn){
      return(
        <Provider store={store}>
          <Layout />
        </Provider>
      )
    }else{
      return null;
    }
  }
}






// import { Animated, ScrollView, Image, Dimensions, StyleSheet, Text, View } from 'react-native';

// import Home from './app/components/home'; //Import the component file
// import { Tabs } from './config/routes';

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Home/>
//         <Tabs/>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
