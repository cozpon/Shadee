import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import { onSignOut } from '../auth';
import { url } from '../lib/url';
import styles from './Sidebar.style';
import PropTypes from 'prop-types';

class DrawerContent extends Component {
  state = {
    index: 0
  }

  updateIndex = (index) => {
    this.setState({index})
  }

  _handleSubmit = () => {
    let navigation = this.props.navigation;
      fetch(`${url}auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
      .then((res) => {
          onSignOut().then(() => navigation.navigate("SignedOut"));
       })
      .catch(() => {
        alert('There was an error logging in.');
      })
      .done()
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Image source={require('../assets/logo.png')}>
        </Image>

          <Text style={styles.sectionHeadingStyle}>
          </Text>

        <Button
          raised
          icon={{name: 'umbrella', type: 'font-awesome'}}
          title='Feed'
          buttonStyle={styles.button}
          onPress={this.navigateToScreen('Feed')}/>

          <Text style={styles.sectionHeadingStyle}>
          </Text>

        <Button
         raised
         icon={{name: 'user-circle', type: 'font-awesome', size: 20}}
         title='Profile'
         buttonStyle={styles.button}
         onPress={this.navigateToScreen('Profile')}/>

          <Text style={styles.sectionHeadingStyle}>
          </Text>

        <Button
         raised
         icon={{name: 'trash-o', type: 'font-awesome', size: 20}}
         title='Rumor Mill'
         buttonStyle={styles.button}
         onPress={this.navigateToScreen('Feed')}/>

        </ScrollView>
        <Button
         raised
         icon={{name: 'blind', type: 'font-awesome', size: 20}}
         title='How To: Use Shade'
         backgroundColor="#c56d60"
         onPress={this._handleSubmit}/>
          <Text style={styles.sectionHeadingStyle}>
          </Text>

        <Button
         raised
         icon={{name: 'hand-peace-o', type: 'font-awesome'}}
         title='Log Out'
         backgroundColor="#c56d60"
         onPress={this._handleSubmit}/>
      </View>
    );
  }
}

DrawerContent.propTypes = {
  navigation: PropTypes.object
};

export default DrawerContent;