import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Vibration,
  View
} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password: t.String,
    email: t.String,
    emoji: t.list(t.String), //emoji name
    terms: t.Boolean
});


class Register extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();

  }

  componentDidMount(){
    //mount emoji for drop down menu
  }


  render() {
    return(

      <View style={styles.container}>
        <Form
          ref={c => this._form = c} //assign a ref
          type={User}
          options={options}
        />
        <Button
          title="Throw Shade!"
          onPress={this.handleSubmit}
        />
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
  }
});
