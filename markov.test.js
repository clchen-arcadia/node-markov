// TODO:
// "use strict";

const { MarkovMachine } = require("./markov");

// mocking -- replace something with something you can control better
// MarkovMachine._randomChoice = function(arr) {return arr[0];}
// isolating random parts of functions -- good for this kind of mocking!

describe("test the getChains method", function() {
  // TODO: Get an example with repetition! e.g. the cat in the hat.
  test("Test string input 1", function() {
    const testMarkov = new MarkovMachine("The cat in the hat.");
    expect(testMarkov.chains).toEqual({
      The: [ 'cat' ],
      cat: [ 'in' ],
      in: [ 'the' ],
      the: [ 'hat.' ],
      'hat.': [ null ]
    });
  });

  test("Test string input 2.", function() {
    const testMarkov = new MarkovMachine(`A function can have several expectations
       — but be thoughtful about keeping tests small and simple.`);
    expect(testMarkov.chains).toEqual({
      A: [ 'function' ],
      function: [ 'can' ],
      can: [ 'have' ],
      have: [ 'several' ],
      several: [ 'expectations' ],
      expectations: [ '—' ],
      '—': [ 'but' ],
      but: [ 'be' ],
      be: [ 'thoughtful' ],
      thoughtful: [ 'about' ],
      about: [ 'keeping' ],
      keeping: [ 'tests' ],
      tests: [ 'small' ],
      small: [ 'and' ],
      and: [ 'simple.' ],
      'simple.': [ null ]
    });
  });
});

describe("test the getText method", function() {

  test("Test with deterministic chain", function() {
    const testMarkov = new MarkovMachine("The cat in the hat.");
    expect(testMarkov.getText()).toEqual("The cat in the hat.");
  });

  test("test with logic that result is possible", function() {
    const testMarkov = new MarkovMachine(`A function can have several expectations
       — but be thoughtful about keeping tests small and simple.`);
    const result = testMarkov.getText();
    expect(checkMarkovResult(testMarkov, result)).toEqual(true);
  });
});

/** Function returns boolean if the given result is possible given instance of
 * MarkovMachine.
 */
function checkMarkovResult(markovInst, result) {

  let words = result.split(/[ \r\n]+/);
  let chains = markovInst.chains;

  for(let i = 0; i < words.length; i++){

    // triggers at last iteration of for loop
    if(i === words.length - 1){
      if(!checkLinkExists(words[i], null, chains)){
        return false;
      }
      break;
    }

    if(!checkLinkExists(words[i], words[i+1], chains)){
      return false;
    }
  }

  return true;
}

/** Function accepts a key and a value and a Markov map (chains)
 * Function return boolean, checking if the "val" exists in the array at "key"
 * in "chains".
 */
function checkLinkExists(key, val, chains) {

  return chains[key].includes(val);
}

// TODO: ask in morning check-in
// ****** DEBUGGER TESTS **********

// const test = new MarkovMachine('The cat in the hat.');

// const test2 = new MarkovMachine(`A function can have several expectations
// — but be thoughtful about keeping tests small and simple.`);

// debugger;

// checkMarkovResult(test, 'the cat hat. in The');
// checkMarkovResult(test2, `A function can have several expectations
// — but be thoughtful about keeping tests small and simple.`);
