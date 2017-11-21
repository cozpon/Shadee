import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});

export default class Home extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  }

  static navigationOptions = {
    tabBarLabel: 'Home'
  }
  render () {
    return(

      <ImageBackground source={require('../assets/birthday-party.jpg')} style={styles.container}>
      <ScrollView>
      <Image style={styles.logo} source={require("../assets/logo.png")}/>
        <Form
          ref={c => this._form = c} //assign a ref
          type={User}
          options={options}
        />
        <TouchableOpacity
          onPress={this.handleSubmit}
          style={styles.button}>
          <Text style={styles.buttonText}>Throw Shade!</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          Welcome to SHADE, the greatest app created by the Backyard Boiz
        </Text>
        </ScrollView>
      </ImageBackground>

    );
  }
}

const options = {
  fields: {
    email: {
      error: "Don't miss out on all this Shade! Enter an email."
    },
    password: {
      error: "Oops! Try Again. Enter your super secret password."
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: null,
    height: null,
    paddingTop: 20,
    backgroundColor: 'transparent'
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    alignItems: 'center',
    margin: 28,
    marginTop: 80,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffb6c1',
  },
  button: {
    margin: 20,
    backgroundColor:'dodgerblue',
    justifyContent: 'center',
  },
  buttonText: {
    color:'white',
    textAlign: 'center',
    fontSize: 15,
    padding: 10,
  },
});