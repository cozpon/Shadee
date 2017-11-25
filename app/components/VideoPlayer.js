import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";

import Video from "react-native-video";

export default class VideoPlayer extends Component {
  constructor(props){
    super(props)

    this.state = {
      paused: true,
      rate: 1.0,
      currentTime: 0.0,
      duration: 0.0,
      videoIndex: 1,
      buttonIndex: 2
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

  pausePlay(event) {
    event.preventDefault();
    if(this.state.videoIndex === 1){
      this.setState({
        videoIndex: 2,
        buttonIndex: 1,
        paused: !this.state.paused
      })
    }else{
      this.setState({
        videoIndex: 1,
        buttonIndex: 2,
        paused: !this.state.paused
      })
    }
  }

  render() {
    const timePassed = this.getCurrentTimePercentage() * 100;
    const timeRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity onPress={this.pausePlay.bind(this)}>

            <View style={{
              position: 'absolute',
              flex: 1,
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: this.state.buttonIndex,
              borderWidth: 3,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={{uri: "https://ih0.redbubble.net/image.25011287.7046/flat,800x800,070,f.u2.jpg"}} style={styles.playButton}>
              </Image>
            </View>

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
              style={{
                flex: 1,
                flexDirection: 'column',
                height: 300,
                justifyContent: 'center',
                overflow: 'visible',
                zIndex: this.state.videoIndex
              }}
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
  },
  playButton: {
    height: 100,
    width: 100
  }
});