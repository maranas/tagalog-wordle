import tagalogEnglish from './tagalogwords.json';

export default class TagalogDictionary {
  static wordlist = Object.keys(tagalogEnglish);
  static wordCount = TagalogDictionary.wordlist.length;

  static getWordOfTheDay() {
    var yearOffset = Math.floor(this.wordCount/365);
    var offsetMultiplier = ((new Date()).getFullYear() % yearOffset) + 1;
    var index = Math.floor(Math.min(this.dayInYear(), this.wordCount) * offsetMultiplier);
    return {
      word: this.wordlist[index],
      wordIndex: index
    };
  }

  static isValidWord(word) {
    return tagalogEnglish[word];
  }

  // based on https://jsfiddle.net/qz10mygk/
  static dayInYear() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return Math.max(day, 0);
  }
}
