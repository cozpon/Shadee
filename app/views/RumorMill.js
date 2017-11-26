import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import {loadRumors,
          addRumor,
          editRumor
        } from '../actions/rumors';

import { SearchBar } from 'react-native-elements';

class RumorMill extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      victim: null,
      selected: false
    }
  }

  componentWillMount(){
    this.props.loadRumors();
  }

  render(){
    return (
      <View>
        <SearchBar
          containerStyle={styles.textContainer}
          inputStyle={styles.textInput}
          round
          noIcon
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          ref="search"
          onChangeText={this._onChange.bind(this)}
          placeholder='Choose your victim...' />

        { this.state.selected ?
          <View style={styles.list}>
            <Text style={styles.text}>
              I heard {this.state.victim.username}...
            </Text>
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
    );
  }

  _onChange(value){

    this.setState({
      selected: false
    })

    let filteredUsers = this.props.users.filter(user => {
      return user.username.toLowerCase().includes(value.toLowerCase())
    })

    this.setState({
      users: filteredUsers
    })
  }

}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#ffb6c1'
  },
  textInput: {
    height: 60,
    borderColor: '#ffb6c1',
    borderWidth: 1,
    fontSize: 40,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RumorMill);