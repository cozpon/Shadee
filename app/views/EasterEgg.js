import React, { Component } from 'react';
import { ScrollView, Text, Image } from 'react-native';

class EasterEgg extends Component {
  render() {
    return (
        <ScrollView>
          <Text style={{fontSize: 40, fontWeight: 'bold'}}> Welcome 2 Hell </Text>
          <Image source={require('../assets/easteregg.jpg')}>
          </Image>
        </ScrollView>
    )
  }
}


export default EasterEgg;