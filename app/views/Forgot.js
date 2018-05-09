import React, {Component} from "react";
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Text,
  TouchableHighlight, ImageBackground, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-elements";
import { forgotPassword } from '../actions/users';
import { url } from '../lib/url';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const forgotPassForm = t.struct({
    email: t.String,
});

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        email: ''
      }
    };

  this.handlePasswordRecovery = this.handlePasswordRecovery.bind(this);
  this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        email: ''
      }
    };
  }

  handlePasswordRecovery(evt) {

    evt.preventDefault();
    let forgotPasswordEmail = {
      value: {
        email: this.state.value.email
      }
    };
    this.props.forgotPassword(forgotPasswordEmail);
    this.setState({
      value: {
        email: ''
      }
    });
  }

  handleEmailInput(value) {
    console.log(value);
    this.setState({
      value
    });
  }

  render() {
    return(
      <ImageBackground source={require('../assets/splash.jpg')} style={styles.image}>
      <ScrollView style={styles.form}>
        <KeyboardAvoidingView behavior="padding">
          <Form
            ref='form' //assign a ref
            type={forgotPassForm}
            options={options}
            value={this.state.value}
            onChange={this.handleEmailInput}
            style={styles.form}
          />
          <Button
            large
            rounded
            buttonStyle={{ marginTop: 10 }}
            backgroundColor="grey"
            textStyle={{ color: "#ffb6c1" }}
            fontWeight="bold"
            raised={true}
            title="Send Recovery Email"
            onPress={this.handlePasswordRecovery}
          />
         </KeyboardAvoidingView>
      </ScrollView>
      </ImageBackground>
    );
  }
}

// maps store state to local props
const mapStateToProps = (state) => {
  return {
    singleUser : state.singleUser
  };
};

//maps store dispatch to local props
const mapDispatchToProps = (dispatch) => {
  return{
    forgotPassword: (forgotPasswordEmail) => {
      dispatch(forgotPassword(forgotPasswordEmail));
    }
  };
};

const options = {
  label: 'Fill Out Your Email Below',
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
  },
  form: {
    marginTop: 50,
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forgot);