import React, { Component } from 'react';
import { ScrollView, Image, View, AsyncStorage } from 'react-native';
import { onSignOut } from '../auth';
import {
  SampleText,
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";
import VideoPlayer from '../components/VideoPlayer';
import Moment from 'moment';
import { connect } from 'react-redux';
import { loadMessages } from '../actions/messages';
import Message from '../components/Message';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      username: ''
    }
  }

 componentDidMount(){
    this.props.loadMessages();
    AsyncStorage.getItem('username')
    .then((value) => { this.setState({'username': value });
    })
    .done();
  }

  render() {
    const navigation = this.props.navigation;
    let messages = this.props.messages;
    return(
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.username}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView>
        {
          this.props.messages
          .map(message => {
            console.log(messages);
            const fromNow = Moment(message.createdAt).fromNow()
            return (
            <View key={'view' + message.id}>
            <VideoPlayer media={message.media} key={'video' + message.id}/>
            <Message
              body={message.body}
              points={message.points}
              shader={message.shader.username}
              victim={message.victim.username}
              status={message.message_status.name}
              posted={fromNow}
              key={message.id}
            />
            </View>
            )
          })
        }
        </ScrollView>
      </Container>
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);