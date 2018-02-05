import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import { deleteMessage, flagMessage } from '../actions/messages';

class Message extends Component {
  constructor(props) {
    super(props)
  }

  render(){

    return(
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.points} upvotes. This shade is so {this.props.status}.</Text>
        <Text></Text>
        <Text style={styles.text}>{this.props.shader} threw shade @ {this.props.victim}</Text>
        <Text style={styles.body}>{this.props.body}</Text>
        <Text style={styles.moment}>{this.props.posted}</Text>
        {
          (this.props.currentUser === this.props.shadeId) ? <Button
          onPress={(e) => {
            e.preventDefault();
            this.props.deleteMessage(id);
          }}
          title={'Delete Shade'}
          backgroundColor={'transparent'}
          icon={{name: 'delete', color: '#433D3F'}}
        /> : <Button
                onPress={(e) => {
                  e.preventDefault();
                  this.props.flagMessage(id, currentUser);
                }}
                backgroundColor={'transparent'}
                icon={{name: 'flag', color: '#666'}}
                containerViewStyle={{alignItems: 'flex-start', marginTop: -25}}
                large
              />
        }
      </View>


    )
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    flagMessage: (id, currentUser) => {
      dispatch(flagMessage(id, currentUser));
    },
    deleteMessage: (id) => {
      dispatch(deleteMessage(id));
    }
  }
}

export default connect(mapDispatchToProps)(Message);