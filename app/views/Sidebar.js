// const DrawerContent = (props) => (
//   <View>
//     <View
//       style={{
//         backgroundColor: 'lightgrey',
//         height: 110,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 0
//       }} >
//       <Text style={{ color: '#ffb6c1', fontSize: 33 }}>
//         Daddio!
//       </Text>
//     </View>
//     <DrawerItems {...props} />
//   </View>
// )

import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image } from 'react-native';
import { onSignOut } from '../auth';
import { url } from '../lib/url';
import styles from './Sidebar.style';
import PropTypes from 'prop-types';


class DrawerContent extends Component {

  _handleSubmit = () => {
    let navigation = this.props.navigation;
      fetch(`${url}auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
      .then((response) => {
        response
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
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('BubbleAnimation')}>
              How to throw shade ...
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Feed')}>
              Feed
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              what should it say? lol idk
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Profile')}>
                Profile
              </Text>

            </View>
          </View>
        </ScrollView>
        <Text style={styles.footerContainer} onPress={this._handleSubmit}>
        SIGN OUT
        </Text>
      </View>
    );
  }
}

DrawerContent.propTypes = {
  navigation: PropTypes.object
};

export default DrawerContent;