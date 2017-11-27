import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { editRumor } from '../actions/rumors';

class RumorVote extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  _upvote(event){
    let rumor = {id : this.props.id, points : 1};
    this.props.editRumor(rumor);
  }

  _downvote(event){
    let rumor = {id : this.props.id, points : 0};
    this.props.editRumor(rumor);
  }

  render(){
    return(
      <View>
        <Button
          textStyle={{ color: "#ffb6c1" }}
          title="Yeah, I heard that."
          onPress={this._upvote.bind(this)}
        />
        <Button
          textStyle={{ color: "#ffb6c1" }}
          title="Nah, never heard that."
          onPress={this._downvote.bind(this)}
        />
      </View>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editRumor: (rumor) => {
      dispatch(editRumor(rumor));
    }
  }
}

export default connect(null, mapDispatchToProps)(RumorVote);