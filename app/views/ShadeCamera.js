import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';

const VideoPath = "";

class ShadeCamera extends Component {
  constructor(){
    super();
    this.state = {
      cameraType : 'back',
      mirrorMode: false,
      pressStatus: false
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Camera
          captureMode={Camera.constants.CaptureMode.video}
          ref="camera"
          type={this.state.cameraType}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          >

          <TouchableHighlight
            onPressIn={this._switchCamera.bind(this)}
            onHideUnderlay={this._onHideUnderlay.bind(this)}
            onShowUnderlay={this._onShowUnderlay.bind(this)}
          >
            <Icon name="ios-reverse-camera"
              style={ this.state.pressStatus ? styles.switchPress : styles.capture }
              size={90}
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPressIn={this._startRecord.bind(this)}
            onPressOut={this._endVideo.bind(this)}
          >
            <Icon name="ios-radio-button-on-outline" style={styles.capture} size={90} />
          </TouchableHighlight>


        </Camera>
      </View>
    );
  }

  _switchCamera(){
    if(this.state.cameraType === 'back'){
      this.setState({
        cameraType: 'front',
        mirror: true
      })
    }else{
      this.setState({
        cameraType: 'back',
        mirror: false
      })
    }
  }

  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }

  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }


  _startRecord(){
    console.log('start recording');
    startVideo = setTimeout(this._recordVideo.bind(this), 50);
  }

  _recordVideo() {
    console.log('now recording');
    this.refs.camera.capture({
      mode: Camera.constants.CaptureMode.video,
      audio: true,
      target: Camera.constants.CaptureTarget.disk,
      totalSeconds: 60
    })
    .then((data) => {
      VideoPath = data.path;
      if (VideoPath){
        //note: shader_id and victim_id will need to be the real values eventually. shade.mp4 will get its own dynamic name w/ the shader_id in it.
        let data = new FormData();
        data.append('upl', { uri: VideoPath, name: 'shadetest2.mp4', type: 'video'});
        data.append('shader_id', 1);
        data.append('victim_id', 2);

        const config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          body: data
        }

      //Note: we'll be fetching to our forreal server address eventually. Set the url to wherever yours is running at -- IP isn't necessary if you aren't sending from another device. http://localhost:8080/api/messages will be fine.

        fetch('http://10.0.1.8:8080/api/messages', config)
        .then((res) => {
          return RNFS.unlink(VideoPath)
          .then(() => {
            console.log('file deleted');
          })
          .catch((err) => {
            console.log(err.message);
          })
        })
        .catch((err) => {
          console.log(err);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  }

  _endVideo(){
    this.refs.camera.stopCapture();

    console.log('done recording');
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    color: '#fff'
  },
  switchPress: {
    color: '#ffb6c1',
  }
});

export default ShadeCamera;