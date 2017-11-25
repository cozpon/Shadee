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
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
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
      <ScrollView style={styles.contentContainer}>
        <TouchableOpacity onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video
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
    width: null,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  contentContainer: {
    alignContent: 'center'
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  }
});