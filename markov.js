"use strict";

/** Textual markov chain generator. */

class MarkovMachine {
  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".

    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {

    let chains = {};
    const words = this.words;

    for (let i = 0; i < words.length; i++) {
      i === words.length - 1
        ? this._createOrPush(words[i], null, chains)
        : this._createOrPush(words[i], words[i+1], chains);
    }

    return chains;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let outputWords = [];
    let nextWord = this.words[0];

    while (nextWord !== null) {
      outputWords.push(nextWord);
      nextWord = this._randomChoice(this.chains[nextWord]);
    }

    return outputWords.join(" ");
  }


  /** Accepts an array and returns a random item from the array. */

  _randomChoice(arr) {
    const randIdx = Math.floor(Math.random() * arr.length);
    return arr[randIdx];
  }

  /** Method accepts key, value, and object. If key is not preexisting
   * in the object, it will be created, with value of an array of single item
   * of value. Otherwise, value will be pushed to the list value of key.
   * Manipulates the object in place.
   */
  _createOrPush(key, val, obj) {

    if (obj[key] === undefined) {
      obj[key] = [val];
    }
    else {
      obj[key].push(val);
    }
  }
}


const textString = `Four score and seven years ago our
fathers brought forth on this continent, a new nation, conceived in Liberty, and
dedicated to the proposition that all men [sic] are created equal.

Now we are engaged in a great civil war, testing whether that nation, or any
nation so conceived and so dedicated, can long endure. We are met on a great
battle-field of that war. We have come to dedicate a portion of that field, as
a final resting place for those who here gave their lives that that nation
might live. It is altogether fitting and proper that we should do this.

But, in a larger sense, we can not dedicate -- we can not consecrate -- we can
not hallow -- this ground. The brave men, living and dead, who struggled here,
have consecrated it, far above our poor power to add or detract. The world will
little note, nor long remember what we say here, but it can never forget what
they did here. It is for us the living, rather, to be dedicated here to the
unfinished work which they who fought here have thus far so nobly advanced. It
is rather for us to be here dedicated to the great task remaining before us --
that from these honored dead we take increased devotion to that cause for which
they gave the last full measure of devotion -- that we here highly resolve that
these dead shall not have died in vain -- that this nation, under God, shall
have a new birth of freedom -- and that government of the people, by the
people, for the people, shall not perish from the earth.`;

const markovGettysburg = new MarkovMachine(textString);
markovGettysburg.getText();

module.exports = {
  MarkovMachine
};
