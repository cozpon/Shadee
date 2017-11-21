import React, { Component } from 'react';
import {

  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
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
        email: '',
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

      const data = {
        email: value.email,
        password: value.password,
      }
      // Serialize and post the data
      const json = JSON.stringify(data)
      fetch('/auth/login', {
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


  render() {
    return(
    <View style={styles.container}>
      <Form
        ref='form'
        type={User}
        value={this.state.value}
        onChange={this._onChange}
      />
      <TouchableHighlight onPress={this._handleSubmit}>
        <Text style={styles.button}>Throw Shade!</Text>
      </TouchableHighlight>
    </View>

    );
  }
}



const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
      autoCorrect: false,
      error: "Don't miss out on all this Shade! Enter an email."
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      autoCorrect: false,
      error: "Oops! Try Again. Enter your super secret password."
    }
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  }
});

export default Login;

