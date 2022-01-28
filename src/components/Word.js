import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export default class Word extends Component {
  constructor(props) {
    super(props);
    this.elements = [];
    this.inputRefs = [];
  }

  componentDidMount() {
    let firstElementRef = this.inputRefs[0];
    if (firstElementRef && this.props.editable) {
      firstElementRef.current.focus();
    }
  }

  componentDidUpdate() {
    if (!this.props.editable) {
      return;
    }
    let currentWord =
      this.props.state.guesses[this.props.state.currentGuess] || '';
    let startRef = this.inputRefs[0];
    if (currentWord && currentWord.length <= this.props.answer.length) {
      let refIndex = Math.min(currentWord.length, this.props.answer.length - 1);
      let focusedRef = this.inputRefs[refIndex];
      if (focusedRef) {
        focusedRef.current.focus();
      }
    } else if (!currentWord && startRef) {
      startRef.current.focus();
    }
  }

  render() {
    this.elements = [];
    this.inputRefs = [];
    var wordLength = this.props.answer.length;

    let handleChange = text => {
      let currentState = this.props.state;
      var currentWord = currentState.guesses[currentState.currentGuess] || '';
      if (currentWord.length < wordLength) {
        currentWord = currentWord + text;
        currentState.guesses[currentState.currentGuess] = currentWord;
        this.props.handler(currentState);
      }
    };

    let keyPressHandler = event => {
      var pressed = event.nativeEvent.key;
      if (pressed === 'Backspace') {
        let currentState = this.props.state;
        var currentWord = currentState.guesses[currentState.currentGuess] || '';
        if (currentWord.length > 0) {
          currentWord = currentWord.substring(0, currentWord.length - 1);
          currentState.guesses[currentState.currentGuess] = currentWord;
          this.props.handler(currentState);
        }
      }
    };

    let endEditingHandler = () => {
      let currentState = this.props.state;
      var currentWord = currentState.guesses[currentState.currentGuess] || '';
      if (currentWord.length == this.props.answer.length) {
        currentState.guesses[currentState.currentGuess] = currentWord;
        if (currentWord.toUpperCase() == this.props.answer.toUpperCase()) {
          currentState.guessed = true;
          this.props.handler(currentState);
        } else if (currentState.currentGuess < this.props.guessCount) {
          currentState.currentGuess++;
          this.props.handler(currentState);
        }
      }
    };

    let focused = false;
    for (let i = 0; i < wordLength; i++) {
      let letter = '';
      let index = -1;
      if (i < this.props.word.length) {
        letter = this.props.word[i].toUpperCase();
        index = this.props.answer.toUpperCase().indexOf(letter);
      }
      var backgroundColor = 'lightgrey';
      if (!this.props.editable) {
        if (letter == this.props.answer.toUpperCase()[i]) {
          backgroundColor = 'darkseagreen';
        } else if (index > -1) {
          backgroundColor = 'yellow';
        }
      } else {
        backgroundColor = 'aqua';
      }
      var editable = false;
      if ((letter == '' || i == wordLength - 1) && !focused) {
        focused = true;
        editable = this.props.editable;
      }
      let combinedStyles = StyleSheet.flatten([
        styles.letter,
        {backgroundColor: backgroundColor},
      ]);
      let ref = React.createRef();
      let element = (
        <TextInput
          style={combinedStyles}
          editable={editable}
          onChangeText={handleChange}
          onKeyPress={keyPressHandler}
          onBlur={endEditingHandler}
          maxLength={1}
          key={i}
          ref={ref}
          focus={editable}
          value={letter}
        />
      );
      this.elements.push(element);
      this.inputRefs.push(ref);
    }

    return <View style={styles.word}>{this.elements}</View>;
  }
}

const styles = StyleSheet.create({
  word: {
    flexDirection: 'row',
  },
  letter: {
    width: 50,
    height: 50,
    color: 'black',
    fontSize: 24,
    fontFamily: 'verdana',
    //fontWeight: 'bold',
    //borderWidth: 0.5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 4,
  },
});
