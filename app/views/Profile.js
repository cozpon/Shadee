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
import { BlurView, VibrancyView } from 'react-native-blur';
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
        <Header>
          <Left>
            <Icon
              name='map-o'
              type='font-awesome'
              size={25}
              color={'#EAA7B1'}
              underlayColor={'white'}
              onPress={() => navigation.navigate("DrawerOpen")}
            />
          </Left>
          <Body>
            <Title style={{fontFamily: 'Georgia-BoldItalic', fontSize: 23}}>{user.username}</Title>
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
            if(message.shader_id === user.id && !message.deletedAt)
            return (
            <View key={'view' + message.id}>
            <VideoPlayer/>
            <Message
              body={message.body}
              points={message.points}
              shader={message.shader.username}
              victim={message.victim.username}
              status={message.message_status.name}
              posted={fromNow}
              key={message.id}
            />
            <Button
              onPress={(e) => {this.setState({deleteModalVisible: true, blur: true})}}
              backgroundColor={'transparent'}
              icon={{name: 'delete', color: '#433D3F'}}
              containerViewStyle={{alignItems: 'flex-end', marginTop: -25}}
              large
            />
            <Modal
              visible={this.state.deleteModalVisible}
              transparent={true}
              animationType={'fade'}
            >
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  onPress={(e) => {
                    e.preventDefault();
                    this.props.deleteMessage(message.id);
                    this.setState({
                      deleteModalVisible: false,
                      blur: false
                    })
                  }}
                  title={'Delete Shade'}
                  backgroundColor={'black'}
                  large
                  containerViewStyle={{width: 200}}
                />
                <Button
                  onPress={(e) => {
                    this.setState({
                      deleteModalVisible: false,
                      blur: false
                    })
                  }}
                  title={'Cancel'}
                  backgroundColor={'black'}
                  large
                  containerViewStyle={{width: 200}}
                />
              </View>
            </Modal>
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