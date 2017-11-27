import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';

import { url } from '../lib/url';
import { addMessage } from '../actions/messages';

const VideoPath = "";

class ShadeCamera extends Component {
  constructor(){
    super();
    this.state = {
      cameraType : 'back',
      mirrorMode: false,
      recording: false
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
          >
            <Icon
              name="ios-reverse-camera"
              style={ styles.basic }
              size={70}
            />
          </TouchableHighlight>

          <View style={ this.state.recording ? null : styles.noUpload }>

            <TouchableHighlight
              onPressIn={this._endVideo.bind(this)}
            >
              <Icon
                name="ios-cloud-upload"
                style={ styles.basic }
                size={90}
              />
            </TouchableHighlight>

          </View>

          <View style={ styles.recordButton }>
            <TouchableHighlight
              onPressIn={this._startRecord.bind(this)}
              onPressOut={this._nowRecording.bind(this)}
            >
              <Icon
                name="ios-radio-button-on-outline"
                style={ this.state.recording ? styles.recording : styles.basic }
                size={90}
              />
            </TouchableHighlight>
          </View>

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

  _nowRecording(){
    this.setState({
      recording: true
    })
  }

  _startRecord(){
    startVideo = setTimeout(this._recordVideo.bind(this), 50);
  }

  _recordVideo() {
    this.refs.camera.capture({
      mode: Camera.constants.CaptureMode.video,
      audio: true,
      target: Camera.constants.CaptureTarget.disk,
      totalSeconds: 60
    })
    .then((data) => {
      VideoPath = data.path;
      if (VideoPath){
        let data = new FormData();
        data.append('upl', { uri: VideoPath, name: `${this.props.victim.id}.mp4`, type: 'video'});
        data.append('victim_id', parseInt(this.props.victim.id, 10));

        const config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          body: data
        }
        fetch(`${url}messages`, config)
        .then((response) => {
          response.json()
          .then((data) => {
            this.props.addMessage(data);
          });
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
    this.setState({
      recording: false
    });
    alert('Success!');
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  basic: {
    color: '#fff'
  },
  recording: {
    color: '#FF0000'
  },
  noUpload: {
    height: 0,
    width: 0
  },
  recordButton: {
    alignSelf: 'center'
  }
});

const mapStateToProps = (state) => {
  return{
    victim: state.victim
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addMessage: (data) => {
      dispatch(addMessage(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShadeCamera);