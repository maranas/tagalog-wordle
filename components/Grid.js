import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Word from './Word';

export default class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guesses: [],
            currentGuess: 0,
            guessed: false
        };
    }

    handler = (newState) => {
        this.setState(newState);
    };

    render() {
        var guessesLength = this.state.guesses.length;
        const words = [];
        for (let i=0; i<this.props.guessCount; i++) {
            var editable = (i == this.state.currentGuess) && !this.state.guessed;
            if (i < guessesLength) {
                let currentWord = this.state.guesses[i];
                words.push(<Word word={currentWord} answer={this.props.answer} guessCount={this.props.guessCount} editable={editable} key={i} state={this.state} handler={this.handler}/>);
            } else {
                words.push(<Word word={""} answer={this.props.answer} guessCount={this.props.guessCount} editable={editable} key={i} state={this.state} handler={this.handler}/>);
            }
        }
        return (
        <View style={styles.container}>
            <View style={styles.spacer} />
            <Text style={styles.status}>
            {Math.min(this.state.currentGuess + 1, this.props.guessCount)}/{this.props.guessCount}
            </Text>
            {words}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'beige',
    },
    spacer: {
      height: 100
    },
    status: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
      color: 'black'
    }
  });