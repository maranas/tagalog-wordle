export default class GameFinishModalModel {
  visible = false;
  guessed = false;

  constructor(visible, guessed) {
    this.visible = visible;
    this.guessed = guessed;
  }

  generateDisplayText = () => {
    if (this.guessed) {
      return 'Wow naman! Nahulaan mo 🎉!';
    }
    return 'Sayang! Di mo nakuha ☹️';
  };

  getState = () => {
    return {
      visible: this.visible,
      guessed: this.guessed,
    };
  };
}
