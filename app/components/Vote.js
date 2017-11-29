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
      basic: 'black'
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
        extraBackground: '#fb9fa4'
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
        extraBackground: 'transparent'
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
        basicBackground: 'transparent'
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
        basicBackground: '#fb9fa4'
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
        basicBackground: 'transparent'
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
        extraBackground: 'transparent'
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
          containerViewStyle={{width: '50%'}}
        />
        <Button
          onPress={this.handleDownvote.bind(this)}
          title={'Basic'}
          backgroundColor={this.state.basicBackground}
          color={this.state.basic}
          containerViewStyle={{width: '50%'}}
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