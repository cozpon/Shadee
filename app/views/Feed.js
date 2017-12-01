import React, { Component } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Picker,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Modal,
  AsyncStorage
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
import { loadMessages, voteOnMessage, deleteMessage } from '../actions/messages';
import Message from '../components/Message';
import Vote from '../components/Vote';
import Moment from 'moment';
import VideoPlayer from '../components/VideoPlayer';
import { BlurView, VibrancyView } from 'react-native-blur';

const ITEMS_PER_PAGE = 2;

class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sorting: "Latest",
      page: 1,
      error: null,
      end: 2,
      sortModalVisible: false,
      deleteModalVisible: false,
      blur: false,
      user: {}
    }
  }

  componentDidMount(){
    this.props.loadMessages();
    AsyncStorage.getItem('data')
    .then((value) => {
      this.setState({
        user: JSON.parse(value)
      });
    })
    .done();
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
          backgroundColor: '#FF9F1C'
        }}
      />
    )
  }

  render() {
    const navigation = this.props.navigation;
    let shades = '';
    if(this.state.sorting === "Most Extra"){
      shades = (this.props.messages).sort((a, b) => {return b.points - a.points}).filter((message) => {return !message.deletedAt && message.points > -10}).slice(0, this.state.end);
    }else if(this.state.sorting === "Latest"){
      shades = (this.props.messages).sort((a, b) => {return b.id - a.id}).filter((message) => {return !message.deletedAt && message.points > -10}).slice(0, this.state.end);
    }else if(this.state.sorting === "Oldest"){
      shades = (this.props.messages).sort((a, b) => {return a.id - b.id}).filter((message) => {return !message.deletedAt && message.points > -10}).slice(0, this.state.end);
    }else if(this.state.sorting === "Most Basic"){
      shades = (this.props.messages).sort((a, b) => {return a.points - b.points}).filter((message) => {return !message.deletedAt && message.points > -10}).slice(0, this.state.end);
    }
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
            <Title style={{fontFamily: 'Georgia-BoldItalic', fontSize: 23, color: '#011627'}}>Shade</Title>
          </Body>
          <Right>
             <Icon
              name='bars'
              type='font-awesome'
              size={25}
              color={'#FF9F1C'}
              underlayColor={'white'}
              onPress={(e) => this.setState({sortModalVisible: true, blur: true})}
            />
          </Right>
        </Header>

          <Modal
            visible={this.state.sortModalVisible}
            transparent={true}
            animationType={'fade'}
          >
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Button
                onPress={(e) => this.setState({sorting: 'Latest', sortModalVisible: false, blur: false})}
                title={'Latest'}
                backgroundColor={'#011627'}
                color={'white'}
                containerViewStyle={{width: 200}}
                large
              />
              <Button
                onPress={(e) => this.setState({sorting: 'Oldest', sortModalVisible: false, blur: false})}
                title={'Oldest'}
                backgroundColor={'#011627'}
                color={'white'}
                containerViewStyle={{width: 200}}
                large
              />
              <Button
                onPress={(e) => this.setState({sorting: 'Most Extra', sortModalVisible: false, blur: false})}
                title={'Most Extra'}
                backgroundColor={'#011627'}
                color={'white'}
                containerViewStyle={{width: 200}}
                large
              />
              <Button
                onPress={(e) => this.setState({sorting: 'Most Basic', sortModalVisible: false, blur: false})}
                title={'Most Basic'}
                backgroundColor={'#011627'}
                color={'white'}
                containerViewStyle={{width: 200}}
                large
              />
            </View>
          </Modal>

        <List containerStyle={{ paddingBottom: '15%', marginTop: 0 , borderTopWidth: 0}}>
          <FlatList
            data={shades}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.id}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0}
            extraData={this.state}
            renderItem={({ item }) => (
              <View>
                <VideoPlayer />
                <Vote id={item.id}/>
                <Message
                  points={item.points}
                  shader={item.shader.username}
                  victim={item.victim.username}
                  status={item.message_status.name}
                  posted={Moment(item.createdAt).fromNow()}
                  style={styles.text}
                />
                {this.state.user.id === item.shader_id ?
                <Button
                  onPress={(e) => this.setState({deleteModalVisible: true, blur: true})}
                  backgroundColor={'transparent'}
                  icon={{name: 'delete', color: '#433D3F'}}
                  containerViewStyle={{alignItems: 'flex-end', marginTop: -25}}
                  large
                />
                : null}
                <Modal
                  visible={this.state.deleteModalVisible}
                  transparent={true}
                  animationType={'fade'}
                >
                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Button
                      onPress={(e) => {
                        e.preventDefault();
                        this.props.deleteMessage(item.id);
                        this.setState({
                          deleteModalVisible: false,
                          blur: false
                        })
                      }}
                      raised={true}
                      title={'Delete Shade'}
                      backgroundColor={'black'}
                      large
                      underlayColor={'red'}
                      containerViewStyle={{width: 200}}
                      buttonStyle={{marginBottom: 5}}
                    />
                    <Button
                      onPress={(e) => {
                        e.preventDefault();
                        this.setState({
                          deleteModalVisible: false,
                          blur: false
                        })
                      }}
                      raised={true}
                      title={'Cancel'}
                      backgroundColor={'black'}
                      large
                      containerViewStyle={{width: 200}}
                    />
                  </View>
                </Modal>
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
    },
    deleteMessage: (id) => {
      dispatch(deleteMessage(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);