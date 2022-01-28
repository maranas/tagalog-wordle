import React, {
    Component
  } from 'react';
  import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';

export default class Word extends Component {
    componentDidUpdate() {
        let currentWord = this.props.state.guesses[this.props.state.currentGuess] || "";
        if (currentWord && currentWord.length <= this.props.answer.length) {
            let refIndex = Math.min(currentWord.length, this.props.answer.length-1);
            let focusedRef = this.inputRefs[refIndex];
            if (focusedRef && focusedRef.current && !focusedRef.current.isFocused()) {
                focusedRef.current.focus();
            }
        }
    }
    
    render() {
        this.elements = [];
        this.inputRefs = [];
    
        var wordLength = this.props.answer.length;
    
        let handleChange = (text) => {
            let currentState = this.props.state;
            var currentWord = currentState.guesses[currentState.currentGuess] || "";
            console.log(currentWord);
            if (currentWord.length < wordLength) {        
                currentWord = currentWord + text;
                currentState.guesses[currentState.currentGuess] = currentWord;
                this.props.handler(currentState);
            }
        };
    
        let keyPressHandler = (event) => {
            var pressed = event.nativeEvent.key;
            if (pressed === 'Backspace') {
                let currentState = this.props.state;
                var currentWord = currentState.guesses[currentState.currentGuess] || "";
                if (currentWord.length > 0) {
                    currentWord = currentWord.substring(0,currentWord.length-1);
                    currentState.guesses[currentState.currentGuess] = currentWord;
                    this.props.handler(currentState);
                }
            }
        };
    
        let endEditingHandler = () => {
            let currentState = this.props.state;
            var currentWord = currentState.guesses[currentState.currentGuess] || "";
            if (currentWord.length == this.props.answer.length) {
                currentState.guesses[currentState.currentGuess] = currentWord;
                if (currentWord.toUpperCase() == this.props.answer.toUpperCase()) {
                    currentState.guessed = true;
                    this.props.handler(currentState);
                } else if (currentState.currentGuess < this.props.guessCount) {
                    currentState.currentGuess++;
                    this.props.handler(currentState);
                }
            }
        };
        
        let focused = false;
        for (let i=0; i<wordLength; i++) {
            let letter = "";
            let index = -1;
            if (i < this.props.word.length) {
                letter = this.props.word[i].toUpperCase();
                index = this.props.answer.toUpperCase().indexOf(letter);
            }
            var backgroundColor = 'white';
            if (!this.props.editable) {
                if (letter == this.props.answer.toUpperCase()[i] ) {
                    backgroundColor = 'darkseagreen';
                } else if (index > -1) {
                    backgroundColor = 'yellow'; 
                }
            }
            var editable = false;
            if ((letter == "" || i == wordLength - 1) && !focused) {
                focused = true;
                editable = this.props.editable;
            }
            let ref = React.createRef();
            let element = <TextInput autoFocus
                style={styles.letter}
                backgroundColor={backgroundColor}
                editable={editable}
                onChangeText={handleChange}
                onKeyPress={keyPressHandler}
                onEndEditing={endEditingHandler}
                maxLength={1}
                key={i}
                ref={ref}
                focus={editable}>
                {letter}
            </TextInput>;
            this.elements.push(element);
            this.inputRefs.push(ref);
        }
        
        return (
            <View style={styles.word}>
                {this.elements}
            </View>     
        );
    }
}
    
const styles = StyleSheet.create({
    word: {
        flexDirection: 'row'
    },
    letter: {
        width: 40,
        height: 40,
        color: 'black',
        fontSize: 20,
        borderWidth: 0.5,
        borderRadius: 4,           
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 3
    }
});      