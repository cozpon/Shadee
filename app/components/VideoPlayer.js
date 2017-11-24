import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

import Video from "react-native-video";

export default class VideoPlayer extends Component {
  constructor(props){
    super(props)

    this.state = {
      paused: true,
      rate: 1.0,
      currentTime: 0.0,
      duration: 0.0
    }
  }

  onLoad(data) {
    console.log('On load fired!');
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  onEnd(data) {
    this.setState({
      paused: true
    })
  }

  getCurrentTimePercentage(){
    if(this.state.currentTime > 0){
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }else{
      return 0;
    }
  }



  render() {
    const timePassed = this.getCurrentTimePercentage() * 100;
    const timeRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video
            ref={(ref) => {
              this.player = ref
            }}
            source={{uri: "https://d4fzdcljjl4gc.cloudfront.net/1511327099334-shadetest2.mp4"}}
            resizeMode="contain"
            rate={this.state.rate}
            volume={1.0}
            paused={this.state.paused}
            muted={false}
            repeat={true}
            style={styles.video}
            onProgress={this.onProgress.bind(this)}
            onLoad={this.onLoad.bind(this)}
            onEnd={this.onEnd.bind(this)}
          />
          </TouchableOpacity>
          <View style={styles.progress}>
            <View style={[styles.innerProgressCompleted, {flex: timePassed}]} />
            <View style={[styles.innerProgressRemaining, {flex: timeRemaining}]} />
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    flexDirection: 'column',
    height: 300,
    justifyContent: 'center',
    overflow: 'visible'
  },
  contentContainer: {
    justifyContent: 'center'
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 10,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 10,
    backgroundColor: '#2C2C2C',
  }
});