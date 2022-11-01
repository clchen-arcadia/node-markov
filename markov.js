/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".

    debugger;

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
    // TODO: implement this!

    let markovMap = {};

    const words = this.words;

    for(let i = 0; i < words.length; i++){

      // the last iteration of this loop, set this connection to null, then break.
      if(i === words.length - 1){

        if(markovMap[words[i]] === undefined){
          markovMap[words[i]] = [null];
        }
        else{
          markovMap[words[i]].push(null);
        }
        break;
      }

      if(markovMap[words[i]] === undefined){
        markovMap[words[i]] = [words[i+1]];
      }
      else{
        markovMap[words[i]].push(words[i+1]);
      }
    }

    return markovMap;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText(firstWord, markovMap) {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let outputText = "";

    while(nextWord !== null){

    }

    return outputText;
  }
}

const catInHatMachine = new MarkovMachine("the cat in the hat");
