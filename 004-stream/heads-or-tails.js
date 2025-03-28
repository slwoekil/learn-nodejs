#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('node:readline');

const filePath = process.argv[2];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const secretNumber = Math.round(Math.random() + 1);

function headsOrTails(filePath) {
  function checkGameLogFile(filePath) {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFile(filePath, '', () => {});
      }
    });
  }

  function guessTheNumber() {
    console.log('1 или 2?');

    function askGuess() {
      rl.question('', (input) => {
        const gameResult = input == secretNumber ? 'Угадал' : 'Не угадал';
        console.log(gameResult);

        const gameLog = `Загаданное число: ${secretNumber}, ответ игрока: ${input}, результат игры: ${gameResult}\n`;

        fs.appendFile(filePath, gameLog, () => {});
        rl.close();
      });
    }

    askGuess();
  }

  checkGameLogFile(filePath);
  guessTheNumber();
}

headsOrTails(filePath);
