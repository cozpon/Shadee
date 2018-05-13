import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import { deleteMessage, flagMessage } from '../actions/messages';
import { BlurView } from 'react-native-blur';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalVisible: false,
      flagModalVisible: false,
      blur: false
    };
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.points} upvotes. This shade is so {this.props.status}.</Text>
        <Text></Text>
        <Text style={styles.text}>{this.props.shader} threw shade @ {this.props.victim}</Text>
        <Text style={styles.body}>{this.props.body}</Text>
        <Text style={styles.moment}>{this.props.posted}</Text>
        {
          (this.props.currentUser === this.props.shadeId) ?
        <Button
          onPress={(e) => {
            this.setState({deleteModalVisible: true, blur: true})
          }}
          title={'Delete Shade'}
          backgroundColor={'transparent'}
          icon={{name: 'delete', color: '#666'}}
          containerViewStyle={{alignItems: 'flex-end', marginTop: -40, marginRight: -120}}
          large
        />
        :
        <Button
          onPress={(e) => { this.setState({flagModalVisible: true, blur: true}) }}
          backgroundColor={'transparent'}
          icon={{name: 'flag', color: '#666'}}
          containerViewStyle={{alignItems: 'flex-end', marginTop: -40, marginRight: -10, bottom: 3}}
          large
        />
         }
        <Modal
          visible={this.state.deleteModalVisible}
          transparent={true}
          animationType={'fade'}
        >
      { this.state.blur ?
        <BlurView
          style={{position: "absolute", top: 0, left: 0, bottom: 0, right: 0}}
          blurType="xlight"
          blurAmount={5}
          />
         : null }
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Button
              onPress={(e) => {
                e.preventDefault();
                this.props.deleteMessage(this.props.id);
                this.setState({
                  deleteModalVisible: false,
                  blur: false
                })
              }}
              raised={true}
              title={'Delete Shade'}
              backgroundColor={'black'}
              large
              underlayColor={'red'}
              containerViewStyle={{width: 200}}
              buttonStyle={{marginBottom: 5}}
            />
            <Button
              onPress={(e) => {
                e.preventDefault();
                this.setState({
                  deleteModalVisible: false,
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

        <Modal
          visible={this.state.flagModalVisible}
          transparent={true}
          animationType={'fade'}
        >
      { this.state.blur ?
        <BlurView
          style={{position: "absolute", top: 0, left: 0, bottom: 0, right: 0}}
          blurType="xlight"
          blurAmount={5}
          />
         : null }
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Button
              onPress={(e) => {
                e.preventDefault();
                let flagData = {
                  id : this.props.id,
                  user : this.props.currentUser
                };
                this.props.flagMessage(flagData);
              }}
              raised={true}
              title={'Report As Inappropriate'}
              backgroundColor={'black'}
              large
              underlayColor={'red'}
              containerViewStyle={{width: 200}}
              buttonStyle={{marginBottom: 5}}
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
  container: {
    marginTop: 10,
    padding: 20
  },
  text: {
    fontFamily: 'Helvetica Neue',
    fontSize: 17
  },
  body: {
    fontSize: 15
  },
  moment: {
    color: 'grey'
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    flagMessage: (flagData) => {
      dispatch(flagMessage(flagData));
    },
    deleteMessage: (id) => {
      dispatch(deleteMessage(id));
    }
  }
}

export default connect(null, mapDispatchToProps)(Message);