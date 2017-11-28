import React , { Component } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  View

} from 'react-native';
import {
  Container,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body } from 'native-base';
import CircleTransition from '../components/CircleTransition';
import { NavigationActions } from 'react-navigation';

const screens = [{
  id: 0,
  title: 'Select a Target',
  subtitle: 'Search for a person to shade from the search bar',
  icon: require('../assets/target.png'),
  bgcolor: '#f7a583'
}, {
  id: 1,
  title: 'Record a video of yourself',
  subtitle: 'Press record and let everyone know what you think',
  icon: require('../assets/recordYou.png'),
  bgcolor: '#fb9fa4'
}, {
  id: 2,
  title: 'Throw Shade!',
  subtitle: 'Press the cloud to see your video in the feed',
  icon: require('../assets/throwShade.png'),
  bgcolor: '#ecb7bf'
}, {
  id: 3,
  title: 'Get Started!',
  subtitle: ' Vote for your favorite videos by clicking EXTRA or dislike a video with BASIC',
  icon: require('../assets/getIt.png'),
  bgcolor: '#ce897b'
}, {
  id: 4,
  title: 'Get it'
}];

const { width: windowWidth} = Dimensions.get('window');

export default class HowTo extends Component {
  constructor(props){
    super(props);
    this.state = {
      _counter: 0,
      currentbg: screens[0].bgcolor,
      currentTitle: screens[0].title,
      currentSubtitle: screens[0].subtitle,
      currentIcon: screens[0].icon
    };
  }


  changeContent(newScreen) {
    this.setState({
      currentTitle: newScreen.title,
      currentSubtitle: newScreen.subtitle,
      currentIcon: newScreen.icon
    });
  }

  changeColor (newScreen) {
    this.setState({
      currentbg: newScreen.bgcolor,
      currentTitle: newScreen.title,
      currentSubtitle: newScreen.subtitle,
      currentIcon: newScreen.icon

    });
  }

  getCurrentScreen() {
    return screens[this.state._counter];
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  onPress(){
    const { _counter } = this.state;
    let newCounter = _counter < screens.length - 1 ? _counter + 1 : 0;
    this.setState({
      _counter: newCounter
    }, () => {
      if(this.state._counter === 4) {
        console.log(this.state._counter, 'count')
        let navigation = this.props.navigation;
        navigation.navigate('Feed');
      }else {
        this.circleTransition.start(screens[newCounter].bgcolor);
      }

    });
  }


  render() {
    const { _counter } = this.state;
    let newCounter = _counter;

    return (
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View style={[styles.container, {
          backgroundColor: this.state.currentbg
        }]}>
          <CircleTransition
          ref={(circle) => { this.circleTransition = circle}}
          />
          <Image
            source={screens[newCounter].icon}
            style={styles.pageIcon}
          />
          <Text
            style={styles.title}
            >
            {screens[newCounter].title}
          </Text>
          <Text style={styles.subtitle}>
            {screens[newCounter].subtitle}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageIcon: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    marginBottom: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent'
  }
});