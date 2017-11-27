import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { editRumor } from '../actions/rumors';

class RumorVote extends Component {
  constructor(props){
    super(props)

    this.state = {
      voted: false
    }
  }

  _upvote(event){
    let rumor = {id : this.props.id, points : 1};
    this.props.editRumor(rumor);
    this.setState({
      voted: true
    });
  }

  _downvote(event){
    let rumor = {id : this.props.id, points : 0};
    this.props.editRumor(rumor);
    this.setState({
      voted: true
    });
  }

  render(){
    return(
      <View>
      { this.state.voted ? null :
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
      }
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