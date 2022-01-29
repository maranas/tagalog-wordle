import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Word from './Word';

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

  handler = newState => {
    this.setState(newState);
  };

  render() {
    var guessesLength = this.state.guesses.length;
    const words = [];
    for (let i = 0; i < this.props.guessCount; i++) {
      var editable =
        i == this.state.currentGuess && this.state.status !== 'guessed';
      if (i < guessesLength) {
        let currentWord = this.state.guesses[i];
        words.push(
          <Word
            word={currentWord}
            answer={this.props.answer || ''}
            guessCount={this.props.guessCount}
            editable={editable}
            key={i}
            state={this.state}
            handler={this.handler}
          />,
        );
      } else {
        words.push(
          <Word
            word={''}
            answer={this.props.answer || ''}
            guessCount={this.props.guessCount}
            editable={editable}
            key={i}
            state={this.state}
            handler={this.handler}
          />,
        );
      }
    }
    var statusString = '';
    if (this.state.status === 'guessed') {
      statusString = 'You guessed the word!';
    } else if (this.state.status === 'incorrect') {
      //
    } else if (this.state.status === 'invalid') {
      statusString = 'Not in dictionary!';
    } else if (this.state.status === 'gameover') {
      statusString = "You're out of guesses!";
    }

    return (
      <View style={styles.container}>
        <View style={styles.spacer} />
        <View style={styles.topStatus}>
          <Text style={styles.wordInfo}>#{this.props.wordIndex}</Text>
        </View>
        {words}
        <View style={styles.bottomStatus}>
          <Text style={styles.bottomStatusText}>{statusString}</Text>
        </View>
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
    height: 100,
  },
  bottomStatusText: {
    fontSize: 20,
    fontFamily: 'verdana',
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
});
