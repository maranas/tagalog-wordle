import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Grid from './components/Grid';
import TagalogDictionary from './resources/TagalogDictionary';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: 'WORDLE',
      guessCount: 6,
    };
  }

  componentDidMount() {
    this.setState({
      answer: TagalogDictionary.getWordOfTheDay().word || 'TEST',
      guessCount: 6,
      wordIndex: TagalogDictionary.getWordOfTheDay().wordIndex,
    });
  }

  render() {
    return (
      <Grid
        style={styles.container}
        guessCount={this.state.guessCount}
        answer={this.state.answer}
        wordIndex={this.state.wordIndex}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
