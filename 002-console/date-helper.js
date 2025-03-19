#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { DateTime } = require('luxon');

const argv = yargs(hideBin(process.argv))
  .command({
    command: 'current',
    builder: (yargs) => {
      return yargs
        .options('-year', { alias: 'y' })
        .options('-month', { alias: 'm' })
        .options('-date', { alias: 'd' });
    },
    handler: (argv) => {
      handleCurrentCommand(argv);
    },
  })
  .command({
    command: 'add',
    builder: (yargs) => {
      return yargs
        .options('-date', { alias: 'd' })
        .options('-month', { alias: 'm' })
        .options('-year', { alias: 'y' });
    },
    handler: (argv) => {
      handleDateOperations(argv, 'plus');
    },
  })
  .command({
    command: 'sub',
    builder: (yargs) => {
      return yargs
        .options('-date', { alias: 'd' })
        .options('-month', { alias: 'm' })
        .options('-year', { alias: 'y' });
    },
    handler: (argv) => {
      handleDateOperations(argv, 'minus');
    },
  })
  .parse();

function handleCurrentCommand(argv) {
  const currentDate = DateTime.now();

  const slisedDate = {
    year: currentDate.year,
    month: currentDate.monthLong,
    date: currentDate.day,
    default: currentDate.toISO(),
  };

  const dateToPrint = argv.year
    ? slisedDate.year
    : argv.month
    ? slisedDate.month
    : argv.date
    ? slisedDate.date
    : slisedDate.default;

  console.log(dateToPrint);
  return;
}

function handleDateOperations(argv, operation) {
  const currentDate = DateTime.now();
  const durations = {
    date: 'days',
    month: 'months',
    year: 'years',
  };

  for (const [key, timeUnit] of Object.entries(durations)) {
    if (argv[key]) {
      const newDate = currentDate[operation]({ [timeUnit]: argv[key] }).toISO();
      console.log(newDate);
      return;
    }
  }
}
