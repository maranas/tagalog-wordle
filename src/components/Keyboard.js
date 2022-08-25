import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import KeyboardModel from '../models/KeyboardModel';

export default class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createButton = (buttonValue, buttonColor) => {
    var button;
    if (Platform.OS === 'ios') {
      button = (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: buttonColor}]}
          onPress={event => this.pressHandler(buttonValue)}
          underlayColor={buttonColor}
          key={buttonValue}>
          <Text style={styles.button}>{buttonValue}</Text>
        </TouchableOpacity>
      );
    } else {
      button = (
        <View style={styles.button} key={buttonValue}>
          <Button
            title={buttonValue}
            color={buttonColor}
            containerViewStyle={styles.button}
            onPress={event => this.pressHandler(buttonValue)}
          />
        </View>
      );
    }

    return button;
  };

  handler = newState => {
    this.setState(newState);
  };

  pressHandler = letter => {
    this.props.keyPressHandler(letter);
  };

  render() {
    let model = new KeyboardModel(
      this.props.currentGuess,
      this.props.guesses,
      this.props.answer,
    );

    let firstRowButtons = [];
    for (let letter of 'QWERTYUIOP') {
      firstRowButtons.push(
        this.createButton(letter, model.buttonColor(letter)),
      );
    }

    let secondRowButtons = [];
    for (let letter of 'ASDFGHJKL') {
      secondRowButtons.push(
        this.createButton(letter, model.buttonColor(letter)),
      );
    }

    let thirdRowButtons = [];
    thirdRowButtons.push(this.createButton('⌫', 'lightgray'));
    for (let letter of 'ZXCVBNM') {
      thirdRowButtons.push(
        this.createButton(letter, model.buttonColor(letter)),
      );
    }
    thirdRowButtons.push(this.createButton('⏎', 'lightgray'));

    return (
      <View style={styles.container}>
        <View style={styles.row}>{firstRowButtons}</View>
        <View style={styles.row}>{secondRowButtons}</View>
        <View style={styles.row}>{thirdRowButtons}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 32,
    height: 36,
    justifyContent: 'center',
    marginHorizontal: 2,
    marginVertical: 6,
  },
});
