import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Grid from './components/Grid';
import GameFinishModal from './components/GameFinishModal';
import TagalogDictionary from './resources/TagalogDictionary';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: 'WORDLE',
      guessCount: 6,
      wordIndex: 0,
      modalVisible: false,
      guessed: false,
    };
  }

  gameFinishedHandler = guessed => {
    this.setState({
      answer: this.state.answer,
      guessCount: this.state.guessCount,
      wordIndex: this.state.wordIndex,
      modalVisible: true,
      guessed: guessed,
    });
  };

  modalCloseHandler = () => {
    this.setState({
      answer: this.state.answer,
      guessCount: this.state.guessCount,
      wordIndex: this.state.wordIndex,
      modalVisible: false,
      guessed: this.state.guessed,
    });
  };

  componentDidMount() {
    this.setState({
      answer: TagalogDictionary.getWordOfTheDay().word || 'TEST',
      guessCount: 6,
      wordIndex: TagalogDictionary.getWordOfTheDay().wordIndex,
      modalVisible: false,
      guessed: false,
    });
  }

  render() {
    return (
      <View>
        <GameFinishModal
          visible={this.state.modalVisible}
          guessed={this.state.guessed}
          modalCloseHandler={this.modalCloseHandler}
        />
        <Grid
          style={styles.container}
          guessCount={this.state.guessCount}
          answer={this.state.answer}
          wordIndex={this.state.wordIndex}
          gameFinishedHandler={this.gameFinishedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
