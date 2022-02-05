import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Word extends Component {
  render() {
    let elements = [];
    var wordLength = this.props.answer.length;

    for (let i = 0; i < wordLength; i++) {
      let letter = '';
      let index = -1;
      if (i < this.props.word.length) {
        letter = this.props.word[i].toUpperCase();
        index = this.props.answer.toUpperCase().indexOf(letter);
      }
      var backgroundColor = 'lightgrey';
      if (!this.props.editable) {
        if (letter === this.props.answer.toUpperCase()[i]) {
          backgroundColor = 'darkseagreen';
        } else if (index > -1) {
          backgroundColor = 'yellow';
        }
      } else {
        backgroundColor = 'aqua';
      }
      let combinedStyles = StyleSheet.flatten([
        styles.letter,
        {backgroundColor: backgroundColor},
      ]);
      let element = (
        <Text style={combinedStyles} key={i}>
          {letter}
        </Text>
      );
      elements.push(element);
    }

    return <View style={styles.word}>{elements}</View>;
  }
}

const styles = StyleSheet.create({
  word: {
    flexDirection: 'row',
  },
  letter: {
    width: 40,
    height: 40,
    color: 'black',
    fontSize: 28,
    fontFamily: 'verdana',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 4,
  },
});
