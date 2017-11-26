import React, { Component } from 'react';
import { ScrollView, Image, View, AsyncStorage } from 'react-native';
import { onSignOut } from '../auth';
import {
  Container,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Text
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
      data: ''
    }
  }

 componentDidMount(){
    this.props.loadMessages();
    AsyncStorage.getItem('data')
    .then((value) => {
      this.setState({'data': JSON.parse(value) });
    })
    .done();
  }

  render() {
    let navigation = this.props.navigation;
    let messages = this.props.messages;
    let user = this.state.data;
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
            <Title>{user.username}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView>
        <Text>
        Welcom 2 ur profile {user.username}, here u can c all ur shades daddio!
        </Text>
        {
          this.props.messages
          .map(message => {
            const fromNow = Moment(message.createdAt).fromNow()
            console.log(message, 'message');
            if(message.shader_id === user.id)
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