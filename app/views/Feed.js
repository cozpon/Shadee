import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
const axios = require('axios');

class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount(){
    // return fetch('http://localhost:8080/api/messages')
    // .then((response) => {
    //   //console.log(response.json())
    //   let test = response.json()
    //   console.log('test', test);
    // })
    // .then((responseJson) => {
    //   console.log(responseJson)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
    return axios.get('http://localhost:8080/api/messages')
    .then((messages) => {
      console.log(messages);
    })
  }

  render() {
    return(
      <Text>
        Your messages!
      </Text>
    )
  }
}

export default Feed;