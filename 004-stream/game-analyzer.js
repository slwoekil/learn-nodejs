#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const logFilePath = process.argv[2];

function analyzeGameLogs(filePath) {
  const logData = fs.readFileSync(filePath, 'utf-8');
  const logEntries = logData
    .split('\n')
    .filter((entry) => entry.includes('Загаданное число:'));

  let totalGames = 0;
  let wins = 0;

  logEntries.forEach((entry) => {
    totalGames++;
    if (entry.includes('результат игры: Угадал')) {
      wins++;
    }
  });

  const losses = totalGames - wins;
  const winPercentage = ((wins / totalGames) * 100).toFixed(1);

  console.log('=== Статистика игр ===');
  console.log(`Всего партий: ${totalGames}`);
  console.log(`Побед: ${wins}`);
  console.log(`Поражений: ${losses}`);
  console.log(`Процент побед: ${winPercentage}%`);
}

analyzeGameLogs(logFilePath);
