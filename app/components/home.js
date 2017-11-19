'use strict';

import React, { Component } from 'react';
const { StyleSheet, ListView, View, Text,
        ActivityIndicator, Animated, ScrollView, Image } = require('react-native');

import { connect } from 'react-redux';

import * as Actions from '../actions'; //Import your actions
import Register from '../containers/register.js';
import Login from '../containers/login.js';

class Home extends Component {
  constructor(props) {
        super(props);

      };


  componentDidMount() {
        //this.props.getData(); //call our action
    }



  render() {
    return(
      <ScrollView style={styles.container}>
        <Text style={styles.paragraph}>
          Welcome to SHADE, the greatest app created by the Backyard Boiz
        </Text>
        <Register />
        <Login />
        <Image style={styles.logo} source={require("../assets/logo.png")}/>
      </ScrollView>
    );
  };
};


// // The function takes data from the app current state,
// // and insert/links it into the props of our component.
// // This function makes Redux know that this component needs to be passed a piece of the state
// function mapStateToProps(state, props) {
//     return {
//         loading: state.dataReducer.loading,
//         data: state.dataReducer.data
//     }
// }

// // Doing this merges our actions into the component’s props,
// // while wrapping them in dispatch() so that they immediately dispatch an Action.
// // Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(Actions, dispatch);
// }


export default Home;


const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  paragraph: {
    alignItems: 'center',
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffb6c1',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

