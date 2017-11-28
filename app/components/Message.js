import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Moment from 'react-moment';

const Message = ({id, body, points, media, shader, victim, status, posted}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{points} upvotes. Shade is so {status}.</Text>
      <Text></Text>
      <Text style={styles.text}>{body}</Text>
      <Text style={styles.text}>{shader} threw shade @ {victim}</Text>
      <Text>{posted}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20
  },
  text: {
    fontFamily: 'Helvetica Neue',
    fontSize: 17
  }
})

export default Message;