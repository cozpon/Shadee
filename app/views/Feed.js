import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { loadMessages } from '../actions/messages';
import Message from '../components/Message';
import Upvote from '../components/Upvote';
import Downvote from '../components/Downvote';
import moment from 'moment';

class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount(){
    this.props.loadMessages();
  }

  render() {
    console.log(this.props.messages);
    return(
      <ScrollView>
        {
          this.props.messages.map((message) => {
            const fromNow = moment(message.createdAt).fromNow()
            return (
              <View>
                <Message
                  body={message.body}
                  points={message.points}
                  shader={message.shader.username}
                  victim={message.victim.username}
                  status={message.message_status.name}
                  posted={fromNow}
                  key={message.id}
                  style={styles.container}
                />
                <Upvote id={message.id}/>
                <Downvote id={message.id}/>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40
  }
})

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMessages: () => {
      dispatch(loadMessages());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);