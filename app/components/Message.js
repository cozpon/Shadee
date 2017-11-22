import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Moment from 'react-moment';

const Message = ({id, body, points, media, shader, victim, status, posted}) => {
  return (
    <View style={styles.container}>
      <Text>{points} upvotes. So {status}.</Text>
      <Text>{body}</Text>
      <Text>{shader} threw shade at {victim}</Text>
      <Text>{posted}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20
  }
})

export default Message;