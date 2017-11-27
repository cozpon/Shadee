import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { loadUsers } from '../actions/users';
import {loadRumors,
          addRumor,
          editRumor
        } from '../actions/rumors';

import { SearchBar } from 'react-native-elements';

import RumorVote from '../components/RumorVote';


class RumorMill extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      victim: null,
      selected: false,
      text: "",
      rumor: null,
      submitted: false
    }
  }

  componentWillMount(){
    this.props.loadRumors();
  }

  render(){
    return (
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
          placeholder='Who???' />
        {
          this.state.submitted ? null :

          <View>
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
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                />
                <Button
                  textStyle={{ color: "#ffb6c1" }}
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
              <View>
                <Text>
                  Someone heard that { rumor.user.username } { rumor.body }
                </Text>
                <Text>
                Rumor credibility rating: {rumor.points}
                </Text>
                <RumorVote id={rumor.id} />

              </View>
            )
          })
        }
      </ScrollView>
    );
  }

  _onChange(value){
    this.setState({
      selected: false,
      submitted: false
    })
    let filteredUsers = this.props.users.filter(user => {
      return user.username.toLowerCase().includes(value.toLowerCase())
    })
    this.setState({
      users: filteredUsers
    })
  }

  _onSubmit(){
    let data = {
      user_id: this.state.victim.id,
      body: this.state.text,
      points: 1
    }

    this.props.addRumor(data);

    this.setState({
      selected: false,
      submitted: true
    });

  }

}

const styles = StyleSheet.create({
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
    loadUsers: () => {
      dispatch(loadUsers());
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