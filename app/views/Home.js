import React, { Component } from 'react';
import { AsyncStorage, Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});



export default class Home extends Component {
    constructor(props){
    super(props);
    this.state = {
      value: {
        username: '',
        password: ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        username: '',
        password: null
      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }

  _handleSubmit = () => {
    const value = this.refs.form.getValue();
    console.log(value, 'login form data')
      const data = {
        username: value.username,
        password: value.password,
      }
      // Serialize and post the data
      const json = JSON.stringify(data)
      fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          alert(res.error)
        } else {
          AsyncStorage.setItem('jwt', res.token)
          console.log(AsyncStorage)
          console.log(res.token, 'token')
          alert(`Success! You may now access protected content.`)
          // Redirect to home screen
          this.props.navigator.pop()
        }
      })
      .catch(() => {
        alert('There was an error logging in.');
      })
      .done()

  }

  static navigationOptions = {
    tabBarLabel: 'Home'
  }

  render () {
    return(

      <ImageBackground source={require('../assets/birthday-party.jpg')} style={styles.container}>
      <ScrollView>
      <Image style={styles.logo} source={require("../assets/logo.png")}/>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Form
          ref='form'
          type={User}
          options={options}
          value={this.state.value}
          onChange={this._onChange}
        />
        <TouchableHighlight onPress={this._handleSubmit}>
          <Text style={styles.button}>Throw Shade!</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
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
    username: {
      autoCapitalize: 'none',
      autoCorrect: false,
      returnKeyType: "next",
      error: "Don't miss out on all this Shade! Enter an email."
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      autoCorrect: false,
      returnKeyType: "go",
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
    // backgroundColor:'dodgerblue',
    justifyContent: 'center',
  },
  buttonText: {
    color:'white',
    textAlign: 'center',
    fontSize: 15,
    padding: 10,
  },
});