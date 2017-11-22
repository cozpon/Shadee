import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { voteOnMessage } from '../actions/messages';

class Downvote extends Component {
  constructor(props){
    super(props)
  }

  handleDownvote(event){
    event.preventDefault();
    let vote = {
      id: this.props.id,
      vote: 'down'
    }
    console.log(vote);
    this.props.voteOnMessage(vote);
  }

  render(){
    return(
      <Button
        onPress={this.handleDownvote.bind(this)}
        title={'Basic'}
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

export default connect(null, mapDispatchToProps)(Downvote);