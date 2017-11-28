import React, {Component} from "react";
import { ScrollView, View, StyleSheet, Text,
  TouchableHighlight, ImageBackground, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-elements";
import { onSignIn, setStorage } from "../auth";
import { url } from '../lib/url';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});

class Login extends Component {
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
    const navigation = this.props.navigation;

    if(value === null){
      alert('Enter your info to see all the Shade!')
    } else {
      const data = {
        username: value.username,
        password: value.password,
      }
      // Serialize and post the data
      const json = JSON.stringify(data)
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      }
      fetch(`${url}auth/login`, config)
      .then((response) => {
        response.json()
        .then((response) => {
          setStorage(response)
          if(response.success === true){
            onSignIn()
            .then(() => navigation.navigate("SignedIn"));
          } else return alert('Wrong Username or Password');
        })
      })
      .done()
    }
  }


  render() {
    const navigation = this.props.navigation;
    return(
    <ImageBackground source={require('../assets/signIn.jpg')} style={styles.image}>
      <ScrollView>
        <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Form
            ref='form'
            type={User}
            options={options}
            value={this.state.value}
            onChange={this._onChange}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#ffb6c1" }}
            fontWeight="bold"
            raised={true}
            title="SIGN IN"
            onPress={this._handleSubmit}
          />

        <Text style={{marginTop: 40, fontSize: 8, fontWeight: 'bold', textAlign: 'center'}}>
          <Text style={{color: 'white'}}> {`by using this site you agree to our `}</Text>
          <Text style={{color: '#add8e6'}} onPress={() => navigation.navigate("Terms")}>{`Terms of Use`}</Text>
        </Text>
        </KeyboardAvoidingView>
      </View>
      </ScrollView>
     </ImageBackground>
    );
  }
}



const options = {
  fields: {
    username: {
      autoCorrect: false,
      error: "Well, that username is taken already."
    },
    password: {
      password: true,
      autoCorrect: false,
      autoCapitalize: 'none',
      secureTextEntry: true,
      error: "Oops! Try Again. Enter your super secret password."
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
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  }
});

export default Login;

