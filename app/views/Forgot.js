import React, {Component} from "react";

import { Linking, View, ScrollView,
  StyleSheet, ImageBackground, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-elements";

const forgotURL = 'http://localhost:3000/forgot';
// will change this to http://shadeetheapp.com/forgot when we buy the domain

class Forgot extends Component {

  render() {
    return (
      <ImageBackground source={require('../assets/splash.jpg')} style={styles.image}>
      <ScrollView style={styles.form}>
        <View style={styles.container}>
          <Button
            title="Password Recovery"
            onPress={ ()=>{ Linking.openURL(`${forgotURL}`)}}
            large
            buttonStyle={{ marginTop: 20, marginRight: 13 }}
            backgroundColor="#666"
            textStyle={{ color: "#ffb6c1" }}
            fontWeight="bold"
            raised={true} />
        </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex:1,
    width: null,
    height: null,
    paddingTop: 20,
    backgroundColor: 'transparent'
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  }
});

export default (Forgot);