import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Vibration,
  View
} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;
console.log(Form, 'form')

const newUser = t.struct({
    username: t.String,
    password: t.String,
    email: t.String,
    emoji: t.list(t.String), //emoji name
    terms: t.Boolean
});


class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: {
        username: 'check',
        password: '',
        email: '',
        emoji: '',
        terms: false
      }
    }

  }

  // componentDidMount(){
  //   //mount emoji for drop down menu
  // }

  _onChange = (value) => {
    this.setState({
      value: value
    })

    console.log(value, '2nd one set on state')
  }

  _handleAdd = () => {
    const value = this._form.getValue();
    console.log(value, 'handle add getvalue')

    if(value) {
      const data = {
        username: value.username,
        password: value.password,
        email: value.email,
        emoji: value.emoji,
        terms: value.terms
      }

      console.log(data, 'form data')

      const json = JSON.stringify(data);
      console.log('string json data', json)
      fetch('/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then((response) => {
        response.json();
      })
      .then(() => {
        alert('Success! You may now log in.');
        //Redirect to home screen
        this.props.navigator.pop();
      })
      .catch((error) => {
        alert('There was an error creating your account.');
      })
      .done()
    } else {
      //Form validation error
      alert('Please fix the errors listed and try again.')
     }
  }

   render() {
    return(

      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={newUser}
          options={options}
          value={this.state.value}
          onChange={this._onChange.bind(this)}
        />
        <TouchableHighlight onPress={this._handleAdd}>
          <Text style={styles.button}>Throw Shade!</Text>
        </TouchableHighlight>
      </View>

    );
  }
 }

export default Register;


//front-end error handling for form
const options = {
  fields: {
    username: {
      error: "Create a username so we can follow your Shade!"
    },
    email: {
      error: "Don't miss out on all this Shade! Enter an email to stay connected."
    },
    password: {
      error: "Enter your super secret password and check if someone's throwing Shade!"
    },
    emoji: {
      error: "Choose an emoji as your avatar."
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
};

//form stylesheet
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  },
  button: {
    fontSize: 20,
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffb6c1'
  },
});
