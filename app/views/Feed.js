import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { loadMessages } from '../actions/messages';
import Message from '../components/Message';
import Upvote from '../components/Upvote';
import Downvote from '../components/Downvote';
import Moment from 'moment';
import VideoPlayer from '../components/VideoPlayer';

class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      sorting: "latest"
    }
  }

  componentDidMount(){
    this.props.loadMessages();
  }

  render() {
    console.log(this.state.sorting);
    if(this.state.sorting === "highest"){
    return(
      <ScrollView>
        <Picker
          selectedValue={this.state.sorting}
          onValueChange={(itemValue, itemIndex) => this.setState({sorting: itemValue})}>
          <Picker.Item label="Most Shade" value="highest" />
          <Picker.Item label="Latest" value="latest" />
        </Picker>
        {
        this.props.messages.sort((a, b) => {
          return b.points - a.points })
          .map(message => {
            const fromNow = Moment(message.createdAt).fromNow()
            console.log(message, 'points message')
            return (
              <View>
                <VideoPlayer />
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
  } else if(this.state.sorting === "latest"){
      return(
        <ScrollView>
          <Picker
            iosHeader="Fiter By"
            mode="dropdown"
            selectedValue={this.state.sorting}
            onValueChange={(itemValue, itemIndex) => this.setState({sorting: itemValue})}>
            <Picker.Item label="Most Shade" value="highest" />
            <Picker.Item label="Latest" value="latest" />
          </Picker>
          {
          this.props.messages.sort((a, b) => {
            return a.id - b.id })
            .map(message => {
              const fromNow = Moment(message.createdAt).fromNow()
              return (
                <View>
                  <VideoPlayer />
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