// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `\nPoints for '${word[i]}': ${pointValue}`
         }
      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userWord = input.question("Let's play some scrabble! \n\nEnter a word to score: ");
   return userWord;
};

let simpleScorer = (word) => {
   return word.length;
};

let vowelBonusScorer = (word) => {
   let score = 0;
   let letterArrayUpperCase = word.toUpperCase().split('');
   let vowels = oldPointStructure['1'].slice(0, 5);

   letterArrayUpperCase.forEach(letter => {
      if (vowels.indexOf(letter) !== -1) {
         score += 3;
      } else {
         score += 1;
      }
   });

   return score;
};

let scrabbleScorer;

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scoringFunction: simpleScorer
   },

   {
      name: 'Bonus Vowels',
      description: 'A function that returns a score based on the number of vowels and consonants.',
      scoringFunction: vowelBonusScorer
   },

   {
      name: 'Scrabble',
      description: 'Uses the oldScrabbleScorer() function to determine the score for a given word.',
      scoringFunction: oldScrabbleScorer
   }
];

function printAlgorithmNameAndDescription(num){
   return `${scoringAlgorithms[num].name}: ${scoringAlgorithms[num].description}`
}

function scorerPrompt(word) { 
   let scoringChoice = Number(input.question(`\nWhich scoring algorithm would you like to use? \n\n 0 - ${printAlgorithmNameAndDescription(0)}  \n 1 - ${printAlgorithmNameAndDescription(1)} \n 2 - ${printAlgorithmNameAndDescription(2)}\n\n Enter 0, 1, or 2: `));
   let score = `Score for '${word}': ${scoringAlgorithms[scoringChoice].scoringFunction(word)}`;
   return score;
};

function transform() { };

let newPointStructure;

function runProgram() {
   let word = initialPrompt(); 
   console.log(scorerPrompt(word));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
