import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ScrollView
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

import { SearchBar, Button, Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import {loadRumors,
          addRumor,
          editRumor
        } from '../actions/rumors';

import RumorVote from '../components/RumorVote';


class RumorMill extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      victim: null,
      selected: false,
      rumor: null,
      submitted: false
    }
  }

  componentWillMount(){
    this.props.loadRumors();
  }

  render(){
    const textInput = {};
    const navigation = this.props.navigation;
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
            <Title >Shade</Title>
          </Body>
          <Right />
        </Header>

        <ScrollView>
          <SearchBar
            containerStyle={styles.textContainer}
            inputStyle={styles.search}
            round
            noIcon
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='default'
            ref="search"
            onChangeText={this._onChange.bind(this)}
            placeholder='' />
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
                    this.state.users.map((user) => {
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

          {
            this.props.rumors.map((rumor) => {
              return(
                <View style={styles.rumor} key={rumor.id}>
                  <Text style={styles.rumorText}>
                    Someone heard that { rumor.user.username } { rumor.body }
                  </Text>
                  <RumorVote id={rumor.id} />
                  <Text style={styles.credibility}>
                    Rumor credibility rating: {rumor.points}
                  </Text>

                </View>
              )
            })
          }
        </ScrollView>
      </Container>
    );
  };

  _onChange(value){

    if(value.length > 0){
      this.setState({
        selected: false,
        submitted: false
      });

      let filteredUsers = this.props.users.filter(user => {
        return user.username.toLowerCase().includes(value.toLowerCase())
      })

      this.setState({
        users: filteredUsers
      })
    }else{
      this.setState({
        users: []
      })
    }
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
      submitted: true
    });

    textInput = {};

  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center'
  },
  rumor: {
    borderWidth: .5,
    borderColor: '#ffb6c1',
    padding: 20
  },
  rumorText: {
    alignSelf: 'center',
    fontSize: 20
  },
  credibility: {
    alignSelf: 'center'
  },
  textContainer: {
    backgroundColor: '#ffb6c1'
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
    borderColor: '#ffb6c1',
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