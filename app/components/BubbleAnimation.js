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
import CircleTransition from './CircleTransition';
import Swipe from './Swipe';
//import Drawer from '../config/authrouter';

const screens = [{
  id: 0,
  title: 'Select a Target',
  subtitle: 'Search for a person to shade from the search bar',
  icon: require('../assets/chats-icon.png'),
  bgcolor: '#f7baa1'
}, {
  id: 1,
  title: 'Banks',
  subtitle: 'We carefully verify all banks before add them into the app',
  icon: require('../assets/chats-icon.png'),
  bgcolor: '#fb9fa4'
}, {
  id: 2,
  title: 'Stores',
  subtitle: 'All local stores are categorized for your convenience',
  icon: require('../assets/chats-icon.png'),
  bgcolor: '#ff9e99'
}];

const { width: windowWidth} = Dimensions.get('window');

export default class Bubble extends Component {
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

//   onSwipeLeft() {
//     const { _counter } = this.state;
//     let newCounter = _counter < screens.length - 1 ? _counter + 1 : 0;
//     this.swipeTo(newCounter);
//   }

//   onSwipeRight() {
//     const { _counter } = this.state;
//     let newCounter = _counter === 0 ? screens.length - 1 : _counter - 1;
//     this.swipeTo(newCounter);
//   }

//   swipeTo(counter) {
//   const newColor = screens[counter].bgcolor;
//   this.setState({
//     _counter: counter
//   }, () => {
//     this.circleTransition.start(newColor, this.changeColor.bind(this, newColor));
//   });
// }

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

  onPress(){
    const { _counter } = this.state;
    let newCounter = _counter < screens.length - 1 ? _counter + 1 : 0;
    this.setState({
      _counter: newCounter
    }, () => {
      this.circleTransition.start(screens[newCounter].bgcolor);
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