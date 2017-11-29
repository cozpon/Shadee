import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { voteOnMessage } from '../actions/messages';
import { Button } from 'react-native-elements';

class Vote extends Component {
  constructor(props){
    super(props)

    this.state = {
      upvoted: false,
      downvoted: false,
      extraBackground: 'transparent',
      basicBackground: 'transparent',
      extra: 'black',
      basic: 'black',
      extraFont: '',
      basicFont: '',
      extraSize: '',
      basicSize: ''
    }
  }

  handleUpvote(event){
    event.preventDefault();
    if((this.state.upvoted === false) && (this.state.downvoted === false)){
      let vote = {
        id: this.props.id,
        vote: 'up',
        amount: 1
      }
      this.props.voteOnMessage(vote);
      this.setState({
        upvoted: true,
        extraBackground: '#fb9fa4',
        extraFont: 'DancingScript-Bold',
        extraSize: 20
      })
    }else if((this.state.upvoted === true) && (this.state.downvoted === false)){
      let vote = {
        id: this.props.id,
        vote: 'down',
        amount: 1
      }
      this.props.voteOnMessage(vote);
      this.setState({
        upvoted: false,
        extraBackground: 'transparent',
        extraFont: '',
        extraSize: ''
      })
    }else if((this.state.upvoted === false) && (this.state.downvoted === true)){
      let vote = {
        id: this.props.id,
        vote: 'up',
        amount: 2
      }
      this.props.voteOnMessage(vote);
      this.setState({
        upvoted: true,
        downvoted: false,
        extraBackground: '#fb9fa4',
        extraFont: 'DancingScript-Bold',
        extraSize: 20,
        basicBackground: 'transparent',
        basicFont: '',
        basicSize: ''
      })
    }
  }

  handleDownvote(event){
    event.preventDefault();
    if((this.state.downvoted === false) && (this.state.upvoted === false)){
      let vote = {
        id: this.props.id,
        vote: 'down',
        amount: 1
      }
      this.props.voteOnMessage(vote);
      this.setState({
        downvoted: true,
        basicBackground: '#fb9fa4',
        basicFont: 'AmaticSC-Bold',
        basicSize: 20
      })
    }else if((this.state.downvoted === true) && (this.state.upvoted === false)){
      let vote = {
        id: this.props.id,
        vote: 'up',
        amount: 1
      }
      this.props.voteOnMessage(vote);
      this.setState({
        downvoted: false,
        basicBackground: 'transparent',
        basicFont: '',
        basicSize: ''
      })
    }else if((this.state.downvoted === false) && (this.state.upvoted === true)){
      let vote = {
        id: this.props.id,
        vote: 'down',
        amount: 2
      }
      this.props.voteOnMessage(vote);
      this.setState({
        downvoted: true,
        upvoted: false,
        basicBackground: '#fb9fa4',
        basicFont: 'AmaticSC-Bold',
        basicSize: 20,
        extraBackground: 'transparent',
        extraFont: '',
        extraSize: ''
      })
    }
  }

  render(){
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          onPress={this.handleUpvote.bind(this)}
          title={'Extra'}
          backgroundColor={this.state.extraBackground}
          color={this.state.extra}
          containerViewStyle={{width: '50%', height: 50}}
          fontFamily={this.state.extraFont}
          fontSize={this.state.extraSize}
        />
        <Button
          onPress={this.handleDownvote.bind(this)}
          title={'Basic'}
          backgroundColor={this.state.basicBackground}
          color={this.state.basic}
          containerViewStyle={{width: '50%', height: 50}}
          fontFamily={this.state.basicFont}
          fontSize={this.state.basicSize}
        />

      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteOnMessage: (vote) => {
      dispatch(voteOnMessage(vote));
    }
  }
}

export default connect(null, mapDispatchToProps)(Vote);