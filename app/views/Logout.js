import React, { Component } from 'react';
import { ScrollView, Text, Button, Image } from 'react-native';
import { onSignOut } from '../auth';
import { url } from '../lib/url';
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Body,
  Content,

} from "native-base";

class Logout extends Component {

  _handleSubmit = () => {
    let navigation = this.props.navigation;
      fetch(`${url}auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      })
      .then((response) => {
        console.log(response, 'response')
        response
      })
      .then((res) => {
          onSignOut().then(() => navigation.navigate("SignedOut"));
       })
      .catch(() => {
        alert('There was an error logging in.');
      })
      .done()

  }

  render() {
    let navigation = this.props.navigation;
    return(
      <ScrollView>
    <Button
        onPress={() => navigation.navigate('DrawerOpen')}
        title="Open drawer"
      />

     <Button
        backgroundColor="#03A9F4"
        title="SIGN OUT"
        onPress={this._handleSubmit}
      />
    </ScrollView>

    );
  }
}

export default Logout;