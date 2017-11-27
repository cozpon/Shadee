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
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";

import {
  Icon,
  List,
  ListItem,
  SearchBar
} from 'react-native-elements';

import ModalDropdown from 'react-native-modal-dropdown';

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
      sorting: "Latest",
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

  shuffleStep(arr){
    for(let i = arr.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  renderHeader = () => {
    return(
      <ModalDropdown
        options={['Latest', 'Oldest', 'Most Extra', 'Most Basic', 'Random']}
        defaultValue={'Latest'}
        onSelect={(idx, value) => {
          this.setState({
            sorting: value
          })
        }}
        animated={false}
        // textStyle={{
        //   fontFamily:
        // }}
        // dropdownStyle={{

        // }}
        // dropdownTextStyle={{
        //   fontFamily:
        // }}
        dropdownTextHighlightStyle={{
          color: 'white',
          backgroundColor: '#ffb6c1'
        }}
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          height: 20,
        }}
      />
    )
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
    if(this.state.sorting === "Most Extra"){
      shades = (this.props.messages).slice().sort((a, b) => {return b.points - a.points});
    }else if(this.state.sorting === "Latest"){
      shades = (this.props.messages).slice().sort((a, b) => {return b.id - a.id});
    }else if(this.state.sorting === "Oldest"){
      shades = (this.props.messages).slice().sort((a, b) => {return a.id - b.id});
    }else if(this.state.sorting === "Most Basic"){
      shades = (this.props.messages).slice().sort((a, b) => {return a.points - b.points});
    }else if(this.state.sorting === "Random"){
      shades = this.shuffleStep(this.props.messages)
    }
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
            <Title >Shade</Title>
          </Body>
          <Right />
        </Header>

        <List containerStyle={{ paddingBottom: '20%' }}>
          <FlatList
            data={shades}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
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

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "transparent",
    height: 150,
    width: 120,
    justifyContent: 'flex-end',
    marginTop: 70,
    zIndex: 0,
  },
  container: {
    backgroundColor: "#d2caca",
  },
  image: {
    zIndex: 1,
    marginTop: -50,
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