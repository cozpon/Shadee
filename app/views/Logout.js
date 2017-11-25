import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { onSignOut } from '../auth';
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";

class Logout extends Component {

  _handleSubmit = () => {
    const navigation = this.props.navigation;
      fetch('http://localhost:8080/api/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
      })
      .then((response) => {
        console.log(response, 'response')
        response.json()
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
    return(
    <ScrollView>
     <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Shade Feed</Title>
          </Body>
        </Header>

     <Button
        backgroundColor="#03A9F4"
        title="SIGN OUT"
        onPress={this._handleSubmit}
        style={{marginTop: 100}}
      />
    </Container>
  </ScrollView>


    );
  }
}

export default Logout;