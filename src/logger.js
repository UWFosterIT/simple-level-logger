let toInitialCap = function (str) {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};
let logLevels = ['Silly', 'Debug', 'Verbose',  'Info', 'Warn', 'Error'];
let logLevel = 'Info';

let logger = {
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
    for (let i = 0; i < args.length; i++) {
      if (logLevels.indexOf(msgLevel) >= logLevels.indexOf(logLevel)) {
        console.log(`${msgLevel}: ${args[i]}`);
      }
    }
  }
};

module.exports = logger;