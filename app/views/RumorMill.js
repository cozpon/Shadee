import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  FlatList,
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
  Text
} from "native-base";

import { SearchBar, Button, Icon, ListItem, List } from 'react-native-elements';

import ModalDropdown from 'react-native-modal-dropdown';

import { connect } from 'react-redux';
import { loadRumors, addRumor, editRumor, flagRumor } from '../actions/rumors';
import Moment from 'moment';
import Rumor from '../components/Rumor';
import { BlurView } from 'react-native-blur';

const ITEMS_PER_PAGE = 4;

class RumorMill extends Component {
  constructor(props){
    super(props);
    this.state = {
      sorting: "Latest",
      page: 1,
      end: 4,
      users: [],
      victim: null,
      selected: false,
      rumor: null,
      submitted: false,
      flagModalVisible: false,
      modalVisible: false,
      blur: false,
      showRumors: true,
      credible: '#011627',
      latest: '#FF9F1C'
    };
  }

  componentWillMount(){
    this.props.loadRumors();
    AsyncStorage.getItem('data')
    .then((value) => {
      console.log(JSON.parse(value), "VALUE");
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
          height: 3,
          width: '100%',
          backgroundColor: '#FF9F1C'
        }}
      />
    )
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
            <Button
              title={this.state.sorting}
              iconRight={{name: 'sliders', type: 'font-awesome', color: '#FF9F1C'}}
              backgroundColor={'transparent'}
              color={'#FF9F1C'}
              fontSize={15}
              onPress={(e) => this.setState({blur: true, modalVisible: true})}
              containerViewStyle={{marginRight: 0}}
            />
          </Right>
        </Header>

        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={'fade'}
        >
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Button
              onPress={(e) => this.setState({sorting: 'Latest', modalVisible: false, blur: false, latest: '#FF9F1C', credible: '#011627'})}
              title={'Latest'}
              backgroundColor={this.state.latest}
              color={'white'}
              containerViewStyle={{width: 200}}
              large
              buttonStyle={{marginBottom: 3}}
            />
            <Button
              onPress={(e) => this.setState({sorting: 'Most Credible', modalVisible: false, blur: false, latest: '#011627', credible: '#FF9F1C'})}
              title={'Most Credible'}
              backgroundColor={this.state.credible}
              color={'white'}
              containerViewStyle={{width: 200}}
              large
            />
          </View>
        </Modal>
          <View style={{flex: 1, zIndex: 2}}>
          <SearchBar
            clearIcon
            noIcon
            round
            containerStyle={styles.textContainer}
            inputStyle={styles.search}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='default'
            ref={search => this.search = search}
            onChangeText={this._onChange.bind(this)}
            onClearText={this._onClear.bind(this)}
            placeholder='Search for a user...'
            />
          { this.state.submitted ? null :
            // After searching, but before showing up, this is displayed
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
                    raised={true}
                    iconRight={{name: 'comment', type: 'font-awesome'}}
                    backgroundColor="#E71D36"
                    title="Spread Rumor"
                    buttonStyle={{ marginTop: 10 }}
                    onPress={this._onSubmit.bind(this)}
                  />
                </View>
              :
              //displays this when searching for USER
                <ScrollView>
                  { this.state.users.map(user => {
                      return(
                        <TouchableOpacity
                          key={user.id}
                          onPress={(e) => this.setState({selected: true, victim: user})}
                        >
                          <Text style={styles.username}>
                            {user.username}
                          </Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
              }
            </KeyboardAvoidingView>
          }
          </View>

        { this.state.showRumors ?
        <List containerStyle={{ paddingTop: '13%' }}>
          <FlatList
            style={{marginTop: 1, marginBottom: 45}}
            data={rumors}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.id}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0}
            extraData={this.state}
            renderItem={({ item }) => (
              <View>
                <Rumor
                  id={item.id}
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
        : null }

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
        showRumors: true,
        selected: false
      })
    }
  }

  _onClear(){
    this.setState({
      showRumors: true,
      selected: false,
    })
  }

  _onGossip(text){
    textInput = {text: text};
  }
      // this should be going to DB flagging as offensive instead of async storage
  // _onFlag(event) {
  //   console.log(this.props, "evnet props");
  //   let rumor = {id : this.props.id, offensive : 1};
  //   console.log(this.props, "prOpS");
  //   this.props.flagRumor(rumor);
  //   this.setState({
  //     flagModalVisible: false,
  //     blur: false
  //   });
  //   console.log('flagged');
  // }

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
    zIndex: 2,
  },
  search: {
    marginLeft: 3,
    marginRight: 3,
    height: 60,
    borderColor: '#FF9F1C',
    borderWidth: 2,
    fontSize: 30,
    backgroundColor: 'white',
    color: '#011627'
  },
  textInput: {
    height: 80,
    width: 300,
    borderColor: '#FF9F1C',
    borderWidth: 1,
    fontSize: 20,
    backgroundColor: 'white',
    color: '#011627'
  },
  text: {
    fontSize: 40,
    color: '#011627',
  },
  list: {
    alignItems: 'center',
  },
  username: {
    textAlign: 'center',
    fontSize: 35,
    color: '#011627',
  },
  rumorText: {
    color: 'red',
  }
});

const mapStateToProps = (state) => {
  console.log(state.users);
  console.log(state.rumors, "RUMORS");
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
    },
    // flagRumor: (rumor) => {
    //   dispatch(flagRumor(rumor));
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RumorMill);