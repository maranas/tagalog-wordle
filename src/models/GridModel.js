import TagalogDictionary from '../resources/TagalogDictionary';

export default class GridModel {
  guesses = [];
  currentGuess = 0;
  status = 'guessing';
  wordIndex = 1;

  constructor(guesses, currentGuess, status, wordIndex) {
    this.guesses = guesses;
    this.currentGuess = currentGuess;
    this.status = status;
    this.wordIndex = wordIndex;
  }

  letterAdded = (letter, expectedAnswer, guessCount) => {
    if (this.status === 'guessed' || this.status === 'gameover') {
      return;
    }
    this.status = 'guessing';

    let currentWord = this.guesses[this.currentGuess] || '';

    if (letter === '⌫') {
      if (currentWord.length > 0) {
        currentWord = currentWord.slice(0, -1);
        this.guesses[this.currentGuess] = currentWord;
      }
    } else if (letter === '⏎') {
      if (
        currentWord.length === expectedAnswer.length &&
        guessCount > this.currentGuess
      ) {
        if (!TagalogDictionary.isValidWord(currentWord)) {
          this.status = 'invalid';
        } else {
          this.currentGuess = this.currentGuess + 1;
          if (currentWord === expectedAnswer) {
            this.status = 'guessed';
          } else if (this.currentGuess >= guessCount) {
            this.status = 'gameover';
          }
        }
      }
    } else if (this.currentGuess <= expectedAnswer.length) {
      currentWord = currentWord + letter;
      this.guesses[this.currentGuess] = currentWord;
    }
  };

  gameFinished = () => {
    return this.status === 'guessed' || this.status === 'gameover';
  };

  isGuessEditable = guessIndex => {
    return guessIndex === this.currentGuess && this.status !== 'guessed';
  };

  gridStatusText = () => {
    var statusString = '';
    if (this.status === 'guessed') {
      statusString = '';
    } else if (this.status === 'incorrect') {
      //
    } else if (this.status === 'invalid') {
      statusString = 'Not in dictionary!';
    } else if (this.status === 'gameover') {
      statusString = '';
    }
    return statusString;
  };

  getState = () => {
    return {
      guesses: this.guesses,
      currentGuess: this.currentGuess,
      status: this.status,
      wordIndex: this.wordIndex,
      statusString: this.gridStatusText(),
    };
  };
}
