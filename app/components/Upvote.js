import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { voteOnMessage } from '../actions/messages';

class Upvote extends Component {
  constructor(props){
    super(props)
  }

  handleUpvote(event){
    event.preventDefault();
    let vote = {
      id: this.props.id,
      vote: 'up'
    }
    console.log(vote);
    this.props.voteOnMessage(vote);
  }

  render(){
    return(
      <Button
        onPress={this.handleUpvote.bind(this)}
        title={'Extra'}
      />
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

export default connect(null, mapDispatchToProps)(Upvote);