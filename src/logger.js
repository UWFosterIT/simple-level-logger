const toInitialCap = function (str) {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};
const logLevels = ['Silly', 'Debug', 'Verbose', 'Info', 'Warn', 'Error'];
let logLevel = 'Info';

const logger = {
  init: function (level) {
    if (level) {
      level = toInitialCap(level);
    }
    logLevel = level || 'Info';
  },
  setLevel: function (level) {
    level = toInitialCap(level);
    logLevel = level;
    return logLevel;
  },
  error: function () {
    this.log('Error', arguments);
  },
  warn: function () {
    this.log('Warn', arguments);
  },
  info: function () {
    this.log('Info', arguments);
  },
  verbose: function () {
    this.log('Verbose', arguments);
  },
  debug: function () {
    this.log('Debug', arguments);
  },
  silly: function () {
    this.log('Silly', arguments);
  },
  log: function (msgLevel, args) {
    if (logLevels.indexOf(msgLevel) >= logLevels.indexOf(logLevel)) {
      console.log(`${msgLevel}:`, ...args);
    }
  }
};

module.exports = logger;