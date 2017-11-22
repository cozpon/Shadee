import React, { Component } from 'react';
import {
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

import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';

class TargetSearch extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      victim: null,
      selected: false
    }
  }

  componentDidMount(){
    this.props.loadUsers();
  }

  render(){
    return (
      <View>
        <SearchBar
          round
          noIcon
          autoCapitalize='none'
          keyboardType='default'
          ref="search"
          onChangeText={this._onChange.bind(this)}
          placeholder='Choose your victim...' />

        { this.state.selected ?
          <View>
            <Text>
              Swipe right to throw shade at {this.state.victim.username}, or search for someone else.
            </Text>
          </View>
          :
          <View>
            {
              this.state.users.map((user) => {
                return(
                  <TouchableOpacity style={styles.list} onPress={() => {
                    this.setState({
                        victim: user,
                        selected: true
                      })
                  }}>
                    <Text>
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

  handleClear(event){
    this.setState({
      value: '',
      users: []
    })
  }


}


const styles = StyleSheet.create({
  container: {
    flex:1,
    width: null,
    height: null,
    paddingTop: 20,
    backgroundColor: 'transparent'
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  list: {
    fontSize: 20
  }
});

//this.props.users

const mapStateToProps = (state) => {
  return{
    users: state.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadUsers: () => {
      dispatch(loadUsers());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TargetSearch);