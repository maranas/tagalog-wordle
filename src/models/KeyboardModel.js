export default class KeyboardModel {
  currentGuess = '';
  guesses = [];
  answer = '';
  keyStates = {};

  constructor(currentGuess, guesses, answer) {
    this.currentGuess = currentGuess;
    this.guesses = guesses;
    this.answer = answer.toUpperCase();
    this.generateKeyStates();
  }

  generateKeyStates = () => {
    let keyStates = {
      correct: {},
      incorrectPosition: {},
      incorrect: {},
    };
    let answerSet = {};
    for (let c of this.answer) {
      if (c in answerSet) {
        answerSet[c] = answerSet[c] + 1;
      } else {
        answerSet[c] = 1;
      }
    }
    for (let i = 0; i < this.currentGuess; i++) {
      let guess = this.guesses[i];
      for (let j = 0; j < guess.length && j < this.answer.length; j++) {
        let letter = guess[j];
        let key = 'incorrect';
        if (letter === this.answer[j]) {
          key = 'correct';
        } else if (letter in answerSet) {
          key = 'incorrectPosition';
        }
        if (letter in keyStates[key]) {
          keyStates[key][letter] = keyStates[key][letter] + 1;
        } else {
          keyStates[key][letter] = 1;
        }
      }
    }
    this.keyStates = keyStates;
  };

  buttonColor = letter => {
    if (this.keyStates.correct && letter in this.keyStates.correct) {
      return 'darkseagreen';
    } else if (
      this.keyStates.incorrectPosition &&
      letter in this.keyStates.incorrectPosition
    ) {
      return 'orange';
    } else if (this.keyStates.incorrect && letter in this.keyStates.incorrect) {
      return 'gray';
    }
    return 'lightgray';
  };
}
