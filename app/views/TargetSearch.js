import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
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
  Card,
  CardItem
} from "native-base";

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
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header style={{backgroundColor: '#2EC4B6', margin: 0}}>
          <Left>
          </Left>
          <Body>
            <Title style={{fontFamily: 'Georgia-BoldItalic', fontSize: 23, color: '#011627'}}>Shade</Title>
          </Body>
          <Right>
          </Right>
        </Header>
      <ScrollView style={styles.scrollView}>
        <SearchBar
          containerStyle={styles.textContainer}
          inputStyle={styles.textInput}
          round
          noIcon
          clearIcon
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          ref="search"
          onChangeText={this._onChange.bind(this)}
          onClearText={this._onClear.bind(this)}
          placeholder='Search for a user...' />
        { this.state.selected ?
          <View style={styles.transparent}>
            <Text style={styles.text}>
              Swipe right to throw shade at {this.props.victim.username}, or search for someone else.
            </Text>
            <Image source={require('../assets/default.png')}/>
          </View>
          :
          <View style={ styles.transparent }>
            { this.state.users.map((user) => {
                return(
                  <TouchableOpacity
                    key={user.id}
                    onPress={() => {
                      this.setState({ selected: true })
                      this.props.selectVictim(user);
                    }}>
                      <Text style={styles.text}>
                        <Icon name="ios-person" size={50} color="#E71D36"/>
                        {user.username}
                      </Text>
                  </TouchableOpacity>
                  )
                })
             }
             <Image source={require('../assets/default.png')}/>
          </View>
        }
      </ScrollView>
    </Container>
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
    } else {
      this.setState({
        users: []
      });
    }
  }

  _onClear(){
    this.setState({
      selected: false,
      users: [],
    })
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
