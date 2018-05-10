import React, { Component } from 'react';
import { View, StyleSheet, Modal, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { flagRumor, loadRumors } from '../actions/rumors';
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from 'react-native-blur';
import ModalDropdown from 'react-native-modal-dropdown';

class RumorFlag extends Component {
  constructor(props){
    super(props);

    this.state = {
      flagModalVisible: false,
      blur: false
     };
  }

  componentWillMount(){
    this.props.loadRumors();
  }

    // had to use this to grab the LOGGED IN user's ID
    // to attach with the REQ to the server for FLAG_ID
    // so we can block it from the user that has flagged it.
  _onFlag(event) {
    AsyncStorage.getItem('data')
    .then((value) => {
      this.setState({
        user: JSON.parse(value)
      });
      let rumor = {
        id : this.props.id,
        offensive : 1,
        user: this.state.user.id
      };
      this.props.flagRumor(rumor);
      this.setState({
        flagModalVisible: false,
        blur: false
      });
    });
  }

  render(){
    return(
      <View>
        <Button
          onPress={(e) => this.setState({flagModalVisible: true, blur: true})}
          backgroundColor={'transparent'}
          icon={{name: 'flag', color: '#666'}}
          containerViewStyle={{alignItems: 'flex-end', marginTop: -25, marginRight: -15, flex: 1}}
          large
        />
        <Modal
          visible={this.state.flagModalVisible}
          transparent={true}
          animationType={'fade'}
        >
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Button
                onPress={this._onFlag.bind(this)}
                raised={true}
                title={'Report As Inappropriate'}
                backgroundColor={'black'}
                large
                underlayColor={'red'}
                containerViewStyle={{width: 200}}
                buttonStyle={{marginBottom: 10}}
            />
            <Button
              onPress={(e) => {
                e.preventDefault();
                this.setState({
                  flagModalVisible: false,
                  blur: false
                })
              }}
              raised={true}
              title={'Cancel'}
              backgroundColor={'black'}
              large
              containerViewStyle={{width: 200}}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 200,
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadRumors: (rumor) => {
      dispatch(loadRumors(rumor));
    },
    flagRumor: (rumor) => {
      dispatch(flagRumor(rumor));
    }
  }
}

export default connect(null, mapDispatchToProps)(RumorFlag);