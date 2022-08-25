export default class AppModel {
  wordIndex = 0;
  modalVisible = false;
  guessed = false;

  constructor(answer, guessCount, wordIndex) {
    this.answer = answer;
    this.guessCount = guessCount;
    this.wordIndex = wordIndex;
    this.modalVisible = false;
    this.guessed = false;
  }

  gameFinished = guessed => {
    this.modalVisible = true;
    this.guessed = guessed;
  };

  getState = () => {
    return {
      answer: this.answer,
      guessCount: this.guessCount,
      wordIndex: this.wordIndex,
      modalVisible: this.modalVisible,
      guessed: this.guessed,
    };
  };
}
