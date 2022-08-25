import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Word extends Component {
  render() {
    let elements = [];
    let answer = this.props.answer;
    var wordLength = answer.length;

    let answerSet = {};
    for (let c of answer) {
      if (c in answerSet) {
        answerSet[c] = answerSet[c] + 1;
      } else {
        answerSet[c] = 1;
      }
    }

    for (let i = 0; i < wordLength; i++) {
      let letter = '';
      let index = -1;
      if (i < this.props.word.length) {
        letter = this.props.word[i].toUpperCase();
        index = answer.toUpperCase().indexOf(letter);
      }
      var backgroundColor = 'lightgrey';
      if (!this.props.editable) {
        let currentCount = 0;
        if (letter in answerSet) {
          currentCount = answerSet[letter];
        }
        if (currentCount > 0) {
          if (letter === answer.toUpperCase()[i]) {
            backgroundColor = 'darkseagreen';
          } else if (index > -1) {
            backgroundColor = 'orange';
          }
        }
        if (letter in answerSet) {
          answerSet[letter] = currentCount - 1;
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
