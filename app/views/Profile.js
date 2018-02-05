import React, { Component } from 'react';
import { ScrollView, Image, View, AsyncStorage, Modal } from 'react-native';
import { onSignOut } from '../auth';
import {
  Container,
  Content,
  Header,
  Title,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import { Button, Icon } from 'react-native-elements';
import { BlurView } from 'react-native-blur';
import VideoPlayer from '../components/VideoPlayer';
import Moment from 'moment';
import { connect } from 'react-redux';
import { loadMessages, deleteMessage } from '../actions/messages';
import Message from '../components/Message';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      data: '',
      deleteModalVisible: false,
      blur: false
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
        <Header style={{backgroundColor: '#2EC4B6'}}>
          <Left>
            <Icon
              name='map-o'
              type='font-awesome'
              size={25}
              color={'#FF9F1C'}
              underlayColor={'white'}
              onPress={() => navigation.navigate("DrawerOpen")}
            />
          </Left>
          <Body>
            <Title style={{fontFamily: 'Georgia-BoldItalic', fontSize: 23, color: '#011627'}}>{user.username}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView style={{backgroundColor: '#FDFFFC'}}>
        <View style={{marginTop: 20}}>
          <Text style={{textAlign: 'center', fontSize: 20, color: '#011627'}}>
            Welcom 2 ur profile <Text style={{fontSize: 20, color: '#E71D36'}}>{user.username}</Text>, here u can c all ur shades, daddio!
          </Text>
          <Icon name="ios-glasses" type="ionicon" size={60}/>
        </View>
        {
          this.props.messages
          .map(message => {
            const fromNow = Moment(message.createdAt).fromNow()
            if(message.shader_id === user.id && message.points > -10)
            return (
            <View key={'view' + message.id}>
            <VideoPlayer media={message.media}/>
            <Message
              currentUser={user.id}
              shadeId={message.shader.id}
              id={message.id}
              body={message.body}
              points={message.points}
              shader={message.shader.username}
              victim={message.victim.username}
              status={message.message_status.name}
              posted={fromNow}
              key={message.id}
              deleteMessage={this.props.deleteMessage}
            />
            </View>
            )
          })
        }
        </ScrollView>
      {this.state.blur ?
      <BlurView
        style={{position: "absolute", top: 0, left: 0, bottom: 0, right: 0}}
        blurType="light"
        blurAmount={5}
      />
      : null }
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
    },
    deleteMessage: (id) => {
      dispatch(deleteMessage(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);