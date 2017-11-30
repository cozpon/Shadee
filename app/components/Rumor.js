import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Moment from 'react-moment';
import RumorVote from '../components/RumorVote';

const Rumor = ({id, body, points, user, posted }) => {
  return (
    <View style={styles.rumor} key={ id }>
      <Text style={styles.rumorText}>
        Someone heard that { user.username } { body }
      </Text>
      <RumorVote id={ id } />
      <Text style={styles.credibility}>
        Rumor credibility rating: { points }
      </Text>
      <Text style={styles.moment}>{posted}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  credibility: {
    alignSelf: 'center'
  },
  rumorText: {
    alignSelf: 'center',
    fontSize: 20
  },
  rumor: {
    borderWidth: .5,
    borderColor: '#ffb6c1',
    padding: 20
  },
})

export default Rumor;