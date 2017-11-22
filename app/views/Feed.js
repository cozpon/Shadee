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
            return (
              <Message
                body={message.body}
                points={message.points}
                shader={message.shader.username}
                victim={message.victim.username}
                status={message.message_status.name}
                key={message.id}
                style={styles.container}
              />
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