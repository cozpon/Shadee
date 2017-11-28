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
import styles from './TargetSearch.style';

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

  viewStyle() {
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
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
          placeholder='Choose victim...' />
        { this.state.selected ?
          <View style={styles.transparent}>
            <Text style={styles.text}>
              Swipe right to throw shade at {this.props.victim.username}, or search for someone else.
            </Text>
          </View>
          :
          <View style={styles.transparent}>
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

    if(value.length > 0){
      this.setState({
        selected: false
      });

      let filteredUsers = this.props.users.filter(user => {
        return user.username.toLowerCase().includes(value.toLowerCase())
      });

      this.setState({
        users: filteredUsers
      });
    }else{
      this.setState({
        users: []
      });
    }
  }

}


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