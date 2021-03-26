import { inspect } from 'util';

inspect.defaultOptions.depth = null;

type LogLevel = { text: string, value: number };

const LogLevels = Object.create({});
LogLevels.Error = { text: 'Error', value: 5 };
LogLevels.Warn = { text: 'Warn', value: 4 };
LogLevels.Info = { text: 'Info', value: 3 };
LogLevels.Verbose = { text: 'Verbose', value: 2 };
LogLevels.Debug = { text: 'Debug', value: 1 };
LogLevels.Silly = { text: 'Silly', value: 0 };

export default class Logger {
  get logLevel(): string {
    return this.internalLogLevel.text;
  }

  private internalLogLevel: LogLevel = LogLevels.Info;

  public setLevel(level: string) {
    const newLevel = level.charAt(0).toUpperCase() + level.toLowerCase().slice(1);
    // eslint-disable-next-line no-prototype-builtins
    if (!LogLevels.hasOwnProperty(newLevel)) {
      const err = new Error('Log level not recognized. Must be Error, Warn, Info, Verbose, or Silly');
      Error.captureStackTrace(err, this.setLevel);
      throw err;
    }
    this.internalLogLevel = LogLevels[newLevel];
  }

  constructor(level?: string) {
    this.setLevel(level || 'Info');
  }

  init(level?: string) {
    this.constructor(level);
    return Logger;
  }

  error(...args: any) {
    this.log('Error', args);
  }

  warn(...args: any) {
    this.log('Warn', args);
  }

  info(...args: any) {
    this.log('Info', args);
  }

  verbose(...args: any) {
    this.log('Verbose', args);
  }

  debug(...args: any) {
    this.log('Debug', args);
  }

  silly(...args: any) {
    this.log('Silly', args);
  }

  log(msgLevel: string, args: any) {
    if (LogLevels[msgLevel].value >= this.internalLogLevel.value) {
      // eslint-disable-next-line no-console
      console.log(`${msgLevel}:`, ...args);
    }
  }
}
