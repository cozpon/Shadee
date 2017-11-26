import React, { Component } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Picker,
  ImageBackground,
  FlatList,
  ActivityIndicator
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

import {
  List,
  ListItem,
  SearchBar
} from 'react-native-elements';

import { connect } from 'react-redux';
import { loadMessages, voteOnMessage } from '../actions/messages';
import Message from '../components/Message';
import Vote from '../components/Vote';
import Moment from 'moment';
import VideoPlayer from '../components/VideoPlayer';


class TestFeed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      sorting: "latest",
      loading: false,
      page: 1,
      seed: 1,
      refreshing: false,
      error: null,

    }
  }

  componentDidMount(){
    this.props.loadMessages();
  }

  renderSeparator = () => {
    console.log('STATE', this.state)
    return(
      <View
        style={{
          height: 5,
          width: '100%',
          backgroundColor: '#fb9fa4',
          //marginBottom: 15
        }}
      />
    )
  }

  render() {
    const navigation = this.props.navigation;
    let shades = '';
    if(this.state.sorting === "highest"){
      shades = (this.props.messages).slice().sort((a, b) => {return b.points - a.points});
    }
    else{
      shades = (this.props.messages).slice().sort((a, b) => {return b.id - a.id});
    }
    return(
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate("DrawerOpen")}
              style={{ zIndex: 2}}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Shade Feed</Title>
          </Body>
          <Right />
        </Header>

        <ImageBackground source={require('../assets/logo.png')} style={styles.image}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.sorting}
            onValueChange={(itemValue, itemIndex) => this.setState({sorting: itemValue})}>
            <Picker.Item label="Most Shade" value="highest" />
            <Picker.Item label="Latest" value="latest" />
          </Picker>
        </ImageBackground>

        <List containerStyle={{ paddingBottom: '42%' }}>
          <FlatList
            data={shades}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <VideoPlayer media={item.media} key={'video' + item.id}/>
                <Message
                  body={item.body}
                  points={item.points}
                  shader={item.shader.username}
                  victim={item.victim.username}
                  status={item.message_status.name}
                  posted={Moment(item.createdAt).fromNow()}
                  key={item.id}
                  style={styles.text}
                />
                <Vote id={item.id} key={'vote' + item.id}/>
              </View>
            )}
          />
        </List>
    </Container>
    )
  }
}

// const styles = StyleSheet.create({
//   picker: {
//     backgroundColor: "transparent",
//     height: 150,
//     width: 120,
//     justifyContent: 'flex-end',
//     marginTop: 70,
//     zIndex: 0,
//   },
//   container: {
//     backgroundColor: "#d2caca",
//   },
//   image: {
//     zIndex: 1,
//     marginTop: -50,
//     paddingLeft: 20,
//     height: 150,
//     width: null,
//   }
// })

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

export default connect(mapStateToProps, mapDispatchToProps)(TestFeed);