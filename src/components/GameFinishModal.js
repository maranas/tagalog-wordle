import React, {Component} from 'react';
import {Button, StyleSheet, Text, Modal, View, Pressable} from 'react-native';

export default class GameFinishModal extends Component {
  render() {
    let textToDisplay = this.props.guessed
      ? 'Wow naman! Nahulaan mo 🎉!'
      : 'Sayang! Di mo nakuha ☹️';
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          this.props.modalCloseHandler();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{textToDisplay}</Text>
            <Button title="OK" onPress={() => this.props.modalCloseHandler()} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
  },
  modalView: {
    margin: 24,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    margin: 16,
  },
});
