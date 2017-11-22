import React, { Component } from 'react';
import { ScrollView, Text, Button, Image, StyleSheet } from 'react-native';

export default class FirstScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Image
          source={require('../assets/chats-icon.png')}
          style={{width: 25, height: 25, tintColor: 'black'}}>
        </Image>
      )
  }
  render () {
    return <ScrollView style={styles.view}>
    <Image source={require("../assets/logo.png")}/>
    <Text style={{fontSize: 30}}>
          SSSSHHHAAADDEEEE
        </Text>
      </ScrollView>
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 200,
  },
  logo: {
    justifyContent: 'center',
  }
});