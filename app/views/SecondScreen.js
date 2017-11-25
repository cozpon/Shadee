import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { onSignOut } from '../auth';
import {
  SampleText,
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

export default ({ navigation }) => (
  <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right />
        </Header>
      <ScrollView
      style={{
          backgroundColor: "#bcbec1",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}>

      <Text>DADDIO</Text>


  </ScrollView>
  </Container>
);