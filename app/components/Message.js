import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const Message = ({id, body, points, media, shader, victim, status}) => {
  return (
    <View>
      <Text>{body}</Text>
      <Text>{points}</Text>
      <Text>{shader}</Text>
      <Text>{victim}</Text>
      <Text>{status}</Text>
    </View>
  )
}



export default Message;