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
    console.log(value);
    this.setState({
      value
    })
  }

  _handleAdd = () => {
    console.log(this.refs);
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
        alert('Success! You may now log in.');
        // Redirect to home screen
        this.props.navigator.pop();
      })
      .catch((error) => {
        alert('There was an error creating your account.');
      })
      .done()
    }
  render() {
    return(
      <View style={styles.container}>
        <Form
          ref='form' //assign a ref
          type={newUser}
          options={options}
          value={this.state.value}
          onChange={this._onChange}
        />
        <TouchableHighlight onPress={this._handleAdd}>
          <Text style={[styles.button, styles.greenButton]}>Throw Shade!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const options = {
  fields: {
    username: {
      autoCorrect: false
    },
    email: {
      autoCapitalize: 'none',
      autoCorrect: false,
      error: "Don't miss out on all this Shade! Enter an email to stay connected."
    },
    password: {
      autoCapitalize: 'none',
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
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  greenButton: {
    backgroundColor: '#4CD964'
  },
});

export default Register;