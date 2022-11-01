const { MarkovMachine } = require("./markov");

describe("test the getChains method", function(){

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
