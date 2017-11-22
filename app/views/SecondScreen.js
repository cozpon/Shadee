import React, { Component } from 'react';
import { ScrollView, Text, Button, Image } from 'react-native';
import { onSignOut } from '../auth';

export default ({ navigation }) => (
      <ScrollView
      style={{
          backgroundColor: "#bcbec1",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}>
        <Text style={{
          fontSize: 30,
          alignItems: "center",
          justifyContent: "center",}}>
          This is the SECOND TAB YO DADDIO
        </Text>
        <Button
        backgroundColor="#03A9F4"
        title="SIGN OUT"
        onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
      />
      </ScrollView>
);