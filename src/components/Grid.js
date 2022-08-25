import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Word from './Word';
import Keyboard from './Keyboard';
import TagalogDictionary from '../resources/TagalogDictionary';
import GridModel from '../models/GridModel';

export default class Grid extends Component {
  model = new GridModel([], 0, 'guessing', 1);

  constructor(props) {
    super(props);

    this.state = this.model.getState();
  }

  keyPressHandler = keyPressed => {
    this.model.letterAdded(
      keyPressed,
      this.props.answer,
      this.props.guessCount,
    );
    if (this.model.gameFinished()) {
      this.props.gameFinishedHandler(this.model.status === 'guessed');
    }
    this.setState(this.model.getState());
  };

  render() {
    var guessesLength = this.state.guesses.length;
    const words = [];
    for (let i = 0; i < this.props.guessCount; i++) {
      var editable = this.model.isGuessEditable(i);
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
              <Text style={styles.bottomStatusText}>
                {this.state.statusString}
              </Text>
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
