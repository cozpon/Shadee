import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { voteOnMessage } from '../actions/messages';

class Vote extends Component {
  constructor(props){
    super(props)

    this.state = {
      upvoted: false,
      downvoted: false,
      extra: 'grey',
      basic: 'grey'
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
        extra: '#fb9fa4'
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
        extra: 'grey'
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
        extra: '#fb9fa4',
        basic: 'grey'
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
        basic: '#fb9fa4'
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
        basic: 'grey'
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
        basic: '#fb9fa4',
        extra: 'grey'
      })
    }
  }

  render(){
    return(
      <View>
        <Button
          onPress={this.handleUpvote.bind(this)}
          title={'Extra'}
          color={this.state.extra}
        />
        <Button
          onPress={this.handleDownvote.bind(this)}
          title={'Basic'}
          color={this.state.basic}
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