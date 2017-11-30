import React, { Component } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Picker,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Modal
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Left,
  Right,
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
  Button,
  SearchBar
} from 'react-native-elements';

import ModalDropdown from 'react-native-modal-dropdown';

import { connect } from 'react-redux';
import { loadMessages, voteOnMessage } from '../actions/messages';
import Message from '../components/Message';
import Vote from '../components/Vote';
import Moment from 'moment';
import VideoPlayer from '../components/VideoPlayer';
import { BlurView, VibrancyView } from 'react-native-blur';

const ITEMS_PER_PAGE = 2;

class TestFeed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sorting: "Latest",
      page: 1,
      error: null,
      end: 2,
      modalVisible: false,
      blur: false
    }
  }

  componentDidMount(){
    this.props.loadMessages();
  }

  loadMore = () => {
    this.setState({
      end: (this.state.page+1)*ITEMS_PER_PAGE,
      page: this.state.page+1
    })
  }

  renderSeparator = () => {
    return(
      <View
        style={{
          height: 5,
          width: '100%',
          backgroundColor: '#fb9fa4'
        }}
      />
    )
  }

  render() {
    const navigation = this.props.navigation;
    let shades = '';
    if(this.state.sorting === "Most Extra"){
      shades = (this.props.messages).sort((a, b) => {return b.points - a.points}).slice(0, this.state.end);
    }else if(this.state.sorting === "Latest"){
      shades = (this.props.messages).sort((a, b) => {return b.id - a.id}).slice(0, this.state.end);
    }else if(this.state.sorting === "Oldest"){
      shades = (this.props.messages).sort((a, b) => {return a.id - b.id}).slice(0, this.state.end);
    }else if(this.state.sorting === "Most Basic"){
      shades = (this.props.messages).sort((a, b) => {return a.points - b.points}).slice(0, this.state.end);
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
            <Title style={{fontFamily: 'Georgia-BoldItalic', fontSize: 23}}>Shade</Title>
          </Body>
          <Right />
        </Header>

        <Button
          onPress={(e) => this.setState({modalVisible: true, blur: true})}
          title={`Sort: ${this.state.sorting}`}
          color={'black'}
          backgroundColor={'transparent'}
        />

          <Modal
            visible={this.state.modalVisible}
            transparent={true}
            animationType={'fade'}
          >
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Button
                onPress={(e) => this.setState({sorting: 'Latest', modalVisible: false, blur: false})}
                title={'Latest'}
                backgroundColor={'#000000'}
                color={'white'}
                containerViewStyle={{width: 200}}
                large
              />
              <Button
                onPress={(e) => this.setState({sorting: 'Oldest', modalVisible: false, blur: false})}
                title={'Oldest'}
                backgroundColor={'#000000'}
                color={'white'}
                containerViewStyle={{width: 200}}
                large
              />
              <Button
                onPress={(e) => this.setState({sorting: 'Most Extra', modalVisible: false, blur: false})}
                title={'Most Extra'}
                backgroundColor={'#000000'}
                color={'white'}
                containerViewStyle={{width: 200}}
                large
              />
              <Button
                onPress={(e) => this.setState({sorting: 'Most Basic', modalVisible: false, blur: false})}
                title={'Most Basic'}
                backgroundColor={'#000000'}
                color={'white'}
                containerViewStyle={{width: 200}}
                large
              />
            </View>
          </Modal>

        <List containerStyle={{ paddingBottom: '25%' }}>
          <FlatList
            data={shades}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.id}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0}
            extraData={this.state}
            renderItem={({ item }) => (
              <View>
                <VideoPlayer media={item.media}/>
                <Vote id={item.id}/>
                <Message
                  body={item.body}
                  points={item.points}
                  shader={item.shader.username}
                  victim={item.victim.username}
                  status={item.message_status.name}
                  posted={Moment(item.createdAt).fromNow()}
                  style={styles.text}
                />
              </View>
            )}
          />
        </List>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d2caca",
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