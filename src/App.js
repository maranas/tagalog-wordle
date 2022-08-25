import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Grid from './components/Grid';
import GameFinishModal from './components/GameFinishModal';
import TagalogDictionary from './resources/TagalogDictionary';

import AppModel from './models/AppModel';

export default class App extends Component {
  appModel = new AppModel('WORDLE', 6, 0);

  constructor(props) {
    super(props);
    this.state = this.appModel.getState();
  }

  gameFinishedHandler = guessed => {
    this.appModel.gameFinished(guessed);
    this.setState(this.appModel.getState());
  };

  modalCloseHandler = () => {
    this.appModel.modalVisible = false;
    this.setState(this.appModel.getState());
  };

  componentDidMount() {
    this.appModel = new AppModel(
      TagalogDictionary.getWordOfTheDay().word || 'TEST',
      6,
      TagalogDictionary.getWordOfTheDay().wordIndex,
    );
    this.setState(this.appModel.getState());
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
