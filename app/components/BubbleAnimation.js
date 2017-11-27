import React , { Component } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  View

} from 'react-native';
import CircleTransition from './CircleTransition';
import Swipe from './Swipe';
//import Drawer from '../config/authrouter';

const screens = [{
  id: 0,
  bgcolor: '#698FB2'
}, {
  id: 1,
  bgcolor: '#68B0B3'
}, {
  id: 2,
  bgcolor: '#9B91BA'
}]

const { width, height } = Dimensions.get('window');

export default class Bubble extends Component {
  constructor(props){
    super(props);
    this.state = {
      _counter: 0,
      currentbg: screens[0].bgcolor
    };
  }

  onSwipeLeft() {
    const { _counter } = this.state;
    let newCounter = _counter < screens.length - 1 ? _counter + 1 : 0;
    this.swipeTo(newCounter);
  }

  onSwipeRight() {
    const { _counter } = this.state;
    let newCounter = _counter === 0 ? screens.length - 1 : _counter - 1;
    this.swipeTo(newCounter);
  }

  swipeTo(counter) {
  const newColor = screens[counter].bgcolor;
  this.setState({
    _counter: counter
  }, () => {
    this.circleTransition.start(newColor, this.changeColor.bind(this, newColor));
  });
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



    return (
      // <Swipe
      //   style={[styles.container, {
      //     backgroundColor: this.state.currentbg
      //   }]}
      // >
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View style={[styles.container, {
          backgroundColor: this.state.currentbg
        }]}>
          <CircleTransition
          ref={(circle) => { this.circleTransition = circle}}
          />
        </View>
      </TouchableWithoutFeedback>

      // </Swipe>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
});