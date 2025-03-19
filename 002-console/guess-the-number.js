#!/usr/bin/env node

const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function guessTheNumber() {
  const min = 0;
  const max = 100;
  const secretNumber = Math.floor(Math.random() * max + 1);

  console.log(`Загадано число в диапазоне от ${min} до ${max}`);

  function askGuess() {
    rl.question('', (input) => {
      if (input < secretNumber) {
        console.log('Больше');
        askGuess();
      } else if (input > secretNumber) {
        console.log('Меньше');
        askGuess();
      } else {
        console.log(`Отгадано число ${secretNumber}`);
        rl.close();
      }
    });
  }

  askGuess();
}

guessTheNumber();
