import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';

export default class SecondScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Image
          source={require('../assets/chats-icon.png')}
          style={{width: 25, height: 25, tintColor: 'black'}}>
        </Image>
      )
  }
  render () {
    return <View style={
      {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
    }>
        <Text style={{fontSize: 30}}>
          This is the SECOND  SHADE TAB YO DADDIO
        </Text>
      </View>
  }
}