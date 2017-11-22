import React, {Component} from "react";
import { View, ScrollView, StyleSheet,
  TouchableHighlight, } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";

import t from 'tcomb-form-native';

const Form = t.form.Form;

const newUser = t.struct({
    username: t.String,
    password: t.String,
    email: t.String,
    emoji: t.list(t.String), //emoji name
    terms: t.Boolean
});

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value : {
        username : '',
        password : '',
        email : ''
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
  render() {

    const navigation = this.props.navigation;

    return(


      <ScrollView style={styles.container}>
        <Form
          ref='form' //assign a ref
          type={newUser}
          options={options}
          value={this.state.value}
          onChange={this._onChange}
        />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress=
              {this._handleAdd}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={() => navigation.navigate("SignIn")}
          />

      </ScrollView>
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
      error: "Enter your super secret password and check if someone's throwing Shade!"
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  }
});

export default Register;
