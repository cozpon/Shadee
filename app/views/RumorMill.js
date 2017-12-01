import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  FlatList
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Body,
  Content,
  Text
} from "native-base";

import { SearchBar, Button, Icon, ListItem, List } from 'react-native-elements';

import ModalDropdown from 'react-native-modal-dropdown';

import { BlurView, VibrancyView } from 'react-native-blur';

import { connect } from 'react-redux';
import {loadRumors,
          addRumor,
          editRumor
        } from '../actions/rumors';
import Moment from 'moment';
import RumorVote from '../components/RumorVote';
import Rumor from '../components/Rumor';

const ITEMS_PER_PAGE = 4;

class RumorMill extends Component {
  constructor(){
    super();
    this.state = {
      sorting: "Most Credible",
      users: [],
      victim: null,
      selected: false,
      rumor: null,
      submitted: false,
      blur: false,
      page: 1,
      end: 4,
      modalVisible: false,
      showRumors: true
    }
  }

  componentWillMount(){
    this.props.loadRumors();
  }

  loadMore = () => {
    this.setState({
      end: (this.state.page+1)*ITEMS_PER_PAGE,
      page: this.state.page+1
    })
  }

  render(){
    const textInput = {};
    const navigation = this.props.navigation;
    let rumors = '';
      if(this.state.sorting === "Most Credible"){
        rumors = (this.props.rumors).sort((a, b) => {return b.points - a.points}).slice(0, this.state.end);
      }else if(this.state.sorting === "Latest"){
        rumors = (this.props.rumors).sort((a, b) => {return b.id - a.id}).slice(0, this.state.end);
      }
    return (
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
              onPress={(e) => this.setState({sorting: 'Most Credible', modalVisible: false, blur: false})}
              title={'Most Credible'}
              backgroundColor={'#000000'}
              color={'white'}
              containerViewStyle={{width: 200}}
              large
            />
            <Button
              onPress={(e) => this.setState({sorting: 'Latest', modalVisible: false, blur: false})}
              title={'Latest'}
              backgroundColor={'#000000'}
              color={'white'}
              containerViewStyle={{width: 200}}
              large
            />
          </View>
        </Modal>

          <View style={{flex: 1, zIndex: 2}}>
          <SearchBar
            containerStyle={styles.textContainer}
            inputStyle={styles.search}
            round
            noIcon
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='default'
            ref={search => this.search = search}
            onChangeText={this._onChange.bind(this)}
            onClearText={this._onClear.bind(this)}
            placeholder='Find a target...'
            />
          {
            this.state.submitted ? null :

            <View style={styles.container}>
              { this.state.selected ?
                <View style={styles.list}>
                  <Text style={styles.text}>
                    I heard {this.state.victim.username}...
                  </Text>
                  <TextInput
                    maxLength={100}
                    autoCapitalize='none'
                    multiline={true}
                    editable ={true}
                    style={styles.textInput}
                    onChangeText={this._onGossip.bind(this)}
                    value={this.state.text}
                  />
                  <Button
                    textStyle={{ color: "white" }}
                    backgroundColor="#ffb6c1"
                    title="Spread rumor"
                    onPress={this._onSubmit.bind(this)}
                  />
                </View>
              :
                <View style={styles.list}>
                  {
                    this.state.users.map(user => {
                      return(
                        <TouchableOpacity
                          key={user.id}
                          onPress={() => {
                            this.setState({
                              selected: true,
                              victim: user
                            })
                        }}>
                          <Text style={styles.text}>
                            {user.username}
                          </Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              }
            </View>
          }
          </View>

        {this.state.showRumors ?
        <List containerStyle={{ paddingTop: '15%' }}>
          <FlatList
            data={rumors}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.id}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0}
            extraData={this.state}
            renderItem={({ item }) => (
              <View>
                <Rumor
                  body={item.body}
                  points={item.points}
                  user={item.user.username}
                  posted={Moment(item.createdAt).fromNow()}
                  style={styles.rumorText}
                />
              </View>
            )}
          />
        </List>
        : null}

      {this.state.blur ?
      <BlurView
        style={{position: "absolute", top: 0, left: 0, bottom: 0, right: 0}}
        blurType="light"
        blurAmount={5}
      />
      : null }
      </Container>
    );
  };

  _onChange(value){

    if(value.length > 0){
      this.setState({
        selected: false,
        submitted: false,
        showRumors: false
      });

      let filteredUsers = this.props.users.filter(user => {
        return user.username.toLowerCase().includes(value.toLowerCase())
      })

      this.setState({
        users: filteredUsers
      })
    }else{
      this.setState({
        users: [],
        showRumors: true
      })
    }
  }

  _onClear(){
    console.log('hello')
    this.setState({
      showRumors: true
    })
  }

  _onGossip(text){
    textInput = {text: text};
  }

  _onSubmit(){
    let data = {
      user_id: this.state.victim.id,
      body: textInput.text,
      points: 1
    }

    this.props.addRumor(data);

    this.setState({
      selected: false,
      submitted: true,
      showRumors: true
    });

    textInput = {};
    this.search.clearText();
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'transparent',
    zIndex: 2
  },
  search: {
    height: 60,
    borderColor: '#ffb6c1',
    borderWidth: 1,
    fontSize: 40,
    backgroundColor: 'white',
    color: '#ffb6c1'
  },
  textInput: {
    height: 80,
    width: 300,
    //borderColor: '#ffb6c1',
    borderWidth: 1,
    fontSize: 20,
    backgroundColor: 'white',
    color: '#ffb6c1'
  },
  text: {
    fontSize: 40
  },
  list: {
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  return{
    users: state.users,
    rumors: state.rumors
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadRumors: () => {
      dispatch(loadRumors());
    },
    addRumor: (rumor) => {
      dispatch(addRumor(rumor));
    },
    editRumor: (rumor) => {
      dispatch(editRumor(rumor));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RumorMill);