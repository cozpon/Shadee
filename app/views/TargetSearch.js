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
      <View>
        <SearchBar
          round
          noIcon
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          ref="search"
          onChangeText={this._onChange.bind(this)}
          placeholder='Choose your victim...' />

        { this.state.selected ?
          <View>
            <Text style={styles.list}>
              Swipe right to throw shade at {this.props.victim.username}, or search for someone else.
            </Text>
          </View>
          :
          <View>
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
                    <Text style={styles.list}>
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
  list: {
    fontSize: 40,

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