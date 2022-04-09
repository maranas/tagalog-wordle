import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Word from './Word';
import Keyboard from './Keyboard';
import TagalogDictionary from '../resources/TagalogDictionary';

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guesses: [],
      currentGuess: 0,
      status: 'guessing',
      wordIndex: 1,
    };
  }

  keyPressHandler = keyPressed => {
    let status = this.state.status;
    if (status === 'guessed' || status === 'gameover') {
      return;
    }
    status = 'guessing';

    let newGuesses = this.state.guesses;
    let currentGuess = this.state.currentGuess;
    let currentWord = this.state.guesses[this.state.currentGuess] || '';

    if (keyPressed === '⌫') {
      if (currentWord.length > 0) {
        currentWord = currentWord.slice(0, -1);
        newGuesses[this.state.currentGuess] = currentWord;
      }
    } else if (keyPressed === '⏎') {
      if (
        currentWord.length === this.props.answer.length &&
        this.props.guessCount > currentGuess
      ) {
        if (!TagalogDictionary.isValidWord(currentWord)) {
          status = 'invalid';
        } else {
          currentGuess = currentGuess + 1;
          if (currentWord === this.props.answer) {
            status = 'guessed';
            this.props.gameFinishedHandler(true);
          } else if (currentGuess >= this.props.guessCount) {
            status = 'gameover';
            this.props.gameFinishedHandler(false);
          }
        }
      }
    } else if (this.state.currentGuess <= this.props.answer.length) {
      currentWord = currentWord + keyPressed;
      newGuesses[this.state.currentGuess] = currentWord;
    }

    this.setState({
      guesses: newGuesses,
      currentGuess: currentGuess,
      status: status,
      wordIndex: this.state.wordIndex,
    });
  };

  render() {
    var guessesLength = this.state.guesses.length;
    const words = [];
    for (let i = 0; i < this.props.guessCount; i++) {
      var editable =
        i === this.state.currentGuess && this.state.status !== 'guessed';
      if (i < guessesLength) {
        let currentWord = this.state.guesses[i];
        words.push(
          <Word
            word={currentWord}
            answer={this.props.answer || ''}
            editable={editable}
            key={i}
          />,
        );
      } else {
        words.push(
          <Word
            word={''}
            answer={this.props.answer || ''}
            editable={editable}
            key={i}
          />,
        );
      }
    }
    var statusString = '';
    if (this.state.status === 'guessed') {
      statusString = '';
    } else if (this.state.status === 'incorrect') {
      //
    } else if (this.state.status === 'invalid') {
      statusString = 'Not in dictionary!';
    } else if (this.state.status === 'gameover') {
      statusString = '';
    }

    return (
      <View>
        <View style={styles.spacer} />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.topStatus}>
              <Text style={styles.wordInfo}>#{this.props.wordIndex}</Text>
            </View>
            {words}
            <View style={styles.bottomStatus}>
              <Text style={styles.bottomStatusText}>{statusString}</Text>
            </View>
          </View>
        </ScrollView>
        <Keyboard
          guesses={this.state.guesses}
          currentGuess={this.state.currentGuess}
          answer={this.props.answer}
          keyPressHandler={this.keyPressHandler}
        />
        <View style={styles.spacer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  spacer: {
    height: 100,
  },
  topStatus: {
    flexDirection: 'row',
    marginHorizontal: 70,
  },
  wordInfo: {
    fontSize: 20,
    fontFamily: 'verdana',
    textAlign: 'left',
    margin: 10,
    color: 'black',
    flexGrow: 1,
  },
  guessCounter: {
    fontSize: 20,
    fontFamily: 'verdana',
    textAlign: 'right',
    margin: 10,
    color: 'black',
  },
  bottomStatus: {
    height: 70,
  },
  bottomStatusText: {
    fontSize: 20,
    fontFamily: 'verdana',
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
});
