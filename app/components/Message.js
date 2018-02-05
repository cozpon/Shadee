import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Moment from 'react-moment';

const Message = ({currentUser, shadeId, deleteMessage, id, body, points, media, shader, victim, status, posted, flag}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{points} upvotes. This shade is so {status}.</Text>
      <Text></Text>
      <Text style={styles.text}>{shader} threw shade @ {victim}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.moment}>{posted}</Text>
      {
        (currentUser === shadeId) ? <Button
        onPress={(e) => {
          e.preventDefault();
          deleteMessage(id);
        }}
        title={'Delete Shade'}
        backgroundColor={'transparent'}
        icon={{name: 'delete', color: '#433D3F'}}
      /> : null

      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20
  },
  text: {
    fontFamily: 'Helvetica Neue',
    fontSize: 17
  },
  body: {
    fontSize: 15
  },
  moment: {
    color: 'grey'
  }
})

export default Message;