import React, {Component} from "react";
import { View, ScrollView, StyleSheet,
  TouchableHighlight, ImageBackground, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-elements";
import { onSignIn } from "../auth";

import t from 'tcomb-form-native';

const Form = t.form.Form;

const newUser = t.struct({
    username: t.String,
    password: t.String,
    email: t.String,
    terms: t.Boolean
});

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value : {
      username : '',
      password : '',
      email : '',
      terms : ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value : {
        username : '',
        password : null,
        email : ''

      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }

  _handleAdd = () => {
    const navigation = this.props.navigation;
    const value = this.refs.form.getValue();
    console.log(value.terms, 'value terms')

    if(value === null){
      alert('Enter your info to see all the Shade!')
    }else{
      const data = {
        username: value.username,
        email: value.email,
        password: value.password,
      }
      // Serialize and post the data
      const json = JSON.stringify(data);
        fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        Accept: 'application/json'
        },
        body: json
        })
        .then((response) => response.json())
        .then(() => {
          onSignIn().then(() => navigation.navigate("SignedIn"))
        })
        .catch((error) => {
          alert('There was an error creating your account.');
        })
        .done()
      }
    }

  render() {
    const navigation = this.props.navigation;
    return(
      <ImageBackground source={require('../assets/birthday-party.jpg')} style={styles.image}>
      <ScrollView style={styles.form}>
        <KeyboardAvoidingView behavior="padding">
          <Form
            ref='form' //assign a ref
            type={newUser}
            options={options}
            style={styles.form}
            value={this.state.value}
            onChange={this._onChange}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#ffb6c1" }}
            fontWeight="bold"
            raised={true}
            title="SIGN UP"
            onPress={this._handleAdd}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#ffb6c1" }}
            fontWeight="bold"
            raised={true}
            title="Sign In"
            onPress={() => navigation.navigate("SignIn")}
          />
         </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const options = {
  fields: {
    username: {
      autoCorrect: false
    },
    email: {
      autoCorrect: false,
      error: "Don't miss out on all this Shade! Enter an email to stay connected."
    },
    password: {
      password: true,
      autoCorrect: false,
      autoCapitalize: 'none',
      secureTextEntry: true,
      error: "Enter your super secret password and check if someone's throwing Shade!"
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
};

const styles = StyleSheet.create({
  image: {
    flex:1,
    width: null,
    height: null,
    paddingTop: 20,
    backgroundColor: 'transparent'
  },
  form:{
    paddingTop: 20,
    margin: 20


  },
});

export default Register;
