import React, { Component } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Picker,
  ImageBackground,
} from 'react-native';

import {
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

import { connect } from 'react-redux';
import { loadMessages, voteOnMessage } from '../actions/messages';
import Message from '../components/Message';
import Vote from '../components/Vote';
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
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Shade Feed</Title>
          </Body>
        </Header>


      <ScrollView>
      <ImageBackground source={require('../assets/logo.png')} style={styles.image}>
        <Picker
          style={styles.picker}
          selectedValue={this.state.sorting}
          onValueChange={(itemValue, itemIndex) => this.setState({sorting: itemValue})}>
          <Picker.Item label="Most Shade" value="highest" />
          <Picker.Item label="Latest" value="latest" />
        </Picker>
      </ImageBackground>
        {
        this.props.messages.sort((a, b) => {
          return b.points - a.points })
          .map(message => {
            const fromNow = Moment(message.createdAt).fromNow()
            console.log(message, 'points message')
            return (
              <View style={styles.container} key={'view' + message.id}>
                <VideoPlayer key={'video' + message.id}/>
                <Message
                  body={message.body}
                  points={message.points}
                  shader={message.shader.username}
                  victim={message.victim.username}
                  status={message.message_status.name}
                  posted={fromNow}
                  key={message.id}
                  style={styles.text}
                />
                <Vote id={message.id} key={'vote' + message.id}/>
              </View>
            )
          })
        }
      </ScrollView>
    </Container>
    )
  } else if(this.state.sorting === "latest"){
      return(
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Shade Feed</Title>
          </Body>
          <Right />
        </Header>



        <ScrollView>
        <ImageBackground source={require('../assets/logo.png')} style={styles.image}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.sorting}
            onValueChange={(itemValue, itemIndex) => this.setState({sorting: itemValue})}>
            <Picker.Item label="Most Shade" value="highest" />
            <Picker.Item label="Latest" value="latest" />
          </Picker>
        </ImageBackground>

          {
          this.props.messages.sort((a, b) => {
            return a.id - b.id })
            .map(message => {
              const fromNow = Moment(message.createdAt).fromNow()
              return (
                <View style={styles.container} key={'view' + message.id}>
                  <VideoPlayer key={'video' + message.id}/>
                  <Message
                    body={message.body}
                    points={message.points}
                    shader={message.shader.username}
                    victim={message.victim.username}
                    status={message.message_status.name}
                    posted={fromNow}
                    key={message.id}
                    style={styles.text}
                  />
                  <Vote id={message.id} key={'vote' + message.id}/>
                </View>
              )
            })
          }
        </ScrollView>
      </Container>
      )
    }
  }
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "transparent",
    height: 150,
    width: 100,
    justifyContent: 'flex-end',
    marginTop: 30,
    zIndex: 0,
  },
  container: {
    backgroundColor: "#d2caca",
  },
  image: {
    zIndex: 1,
    marginTop: 10,
    paddingLeft: 20,
    height: 150,
    width: null,
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