import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

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
          key={buttonValue}
        >
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

  getKeyStates = () => {
    let currentGuess = this.props.currentGuess;
    let guesses = this.props.guesses;
    let answer = this.props.answer.toUpperCase();

    let keyStates = {
      correct: {},
      incorrectPosition: {},
      incorrect: {},
    };
    let answerSet = {};
    for (let c of answer) {
      if (c in answerSet) {
        answerSet[c] = answerSet[c] + 1;
      } else {
        answerSet[c] = 1;
      }
    }
    for (let i = 0; i < currentGuess; i++) {
      let guess = guesses[i];
      for (let j = 0; j < guess.length && j < answer.length; j++) {
        let letter = guess[j];
        let key = 'incorrect';
        if (letter === answer[j]) {
          key = 'correct';
        } else if (letter in answerSet) {
          key = 'incorrectPosition';
        }
        if (letter in keyStates[key]) {
          keyStates[key][letter] = keyStates[key][letter] + 1;
        } else {
          keyStates[key][letter] = 1;
        }
      }
    }
    return keyStates;
  };

  buttonColor = (letter, keyStates) => {
    if (keyStates) {
      if (keyStates.correct && letter in keyStates.correct) {
        return 'darkseagreen';
      } else if (
        keyStates.incorrectPosition &&
        letter in keyStates.incorrectPosition
      ) {
        return 'orange';
      } else if (keyStates.incorrect && letter in keyStates.incorrect) {
        return 'gray';
      }
    }
    return 'lightgray';
  };

  render() {
    let keyStates = this.getKeyStates();

    let firstRowButtons = [];
    for (let letter of 'QWERTYUIOP') {
      firstRowButtons.push(
        this.createButton(letter, this.buttonColor(letter, keyStates)),
      );
    }

    let secondRowButtons = [];
    for (let letter of 'ASDFGHJKL') {
      secondRowButtons.push(
        this.createButton(letter, this.buttonColor(letter, keyStates)),
      );
    }

    let thirdRowButtons = [];
    thirdRowButtons.push(this.createButton('⌫', 'lightgray'));
    for (let letter of 'ZXCVBNM') {
      thirdRowButtons.push(
        this.createButton(letter, this.buttonColor(letter, keyStates)),
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
