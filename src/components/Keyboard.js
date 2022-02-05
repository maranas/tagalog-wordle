import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

class KeyboardButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
}

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
          underlayColor={buttonColor}>
          <Text style={styles.button}>{buttonValue}</Text>
        </TouchableOpacity>
      );
    } else {
      button = (
        <View style={styles.button}>
          <Button
            title={buttonValue}
            color={buttonColor}
            key={buttonValue}
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
    let buttonColor = 'lightgray';

    let firstRowButtons = [];
    for (let letter of 'QWERTYUIOP') {
      firstRowButtons.push(this.createButton(letter, buttonColor));
    }

    let secondRowButtons = [];
    for (let letter of 'ASDFGHJKL') {
      secondRowButtons.push(this.createButton(letter, buttonColor));
    }

    let thirdRowButtons = [];
    thirdRowButtons.push(this.createButton('⌫', buttonColor));
    for (let letter of 'ZXCVBNM') {
      thirdRowButtons.push(this.createButton(letter, buttonColor));
    }
    thirdRowButtons.push(this.createButton('⏎', buttonColor));

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
