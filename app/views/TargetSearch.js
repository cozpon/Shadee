import React, { Component } from 'react';
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { loadUsers } from '../actions/users';
import { selectVictim } from '../actions/victims';

import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';

class TargetSearch extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      selected: false
    }
  }

  componentWillMount(){
    this.props.loadUsers();
  }

  render(){
    return (
    <ImageBackground source={require('../assets/birthday-party.jpg')} style={styles.backgroundImage}>
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
              Swipe right to throw shade at {this.props.victim.username}, or search for someone else.
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
                        selected: true
                      })
                      this.props.selectVictim(user);
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
    </ImageBackground>
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
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  backgroundImage: {
    flex: 1
  }
});

const mapStateToProps = (state) => {
  return{
    users: state.users,
    victim: state.victim
  };
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadUsers: () => {
      dispatch(loadUsers());
    },
    selectVictim: (victim) => {
      dispatch(selectVictim(victim));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TargetSearch);