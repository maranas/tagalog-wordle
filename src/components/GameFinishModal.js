import React, {Component} from 'react';
import {Button, StyleSheet, Text, Modal, View, Pressable} from 'react-native';
import GameFinishModalModel from '../models/GameFinishModalModel';

export default class GameFinishModal extends Component {
  render() {
    let model = new GameFinishModalModel(
      this.props.visible,
      this.props.guessed,
    );

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={model.visible}
        onRequestClose={() => {
          this.props.modalCloseHandler();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{model.generateDisplayText()}</Text>
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
