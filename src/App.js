import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Grid from './components/Grid';

var guessCount = 5;
var answer = 'mateo';

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Grid guessCount={guessCount} answer={answer} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
