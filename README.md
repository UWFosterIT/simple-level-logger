# Simple Level Logger

Simple Level Logger is a wrapper for console.log that enables reporting of log events based on a specified logging level. The levels follow the standard NPM logging levels: error, warn, info, verbose, debug, and silly.

This module was designed to work with AWS Lambda and CloudWatch. CloudWatch automatically provides time stamps on log messages.

The log function will automatically expand JavaScript objects to their full depth.

This module works with NodeJS version 8.11.1 and later.

Version 4.0.0 of this module was a complete re-write and changed the instantiation method, but the rest of the API remains the same.

## Install

```shell
npm install simple-level-logger --save
```

## Use

Each log level has a helper function that formats the log message by prepending the current log level to the message and then appending any passed-in parameters. If the current log level is greater than or equal to the message log level, the message is sent to the console.

The current log level can be set when the logger is instantiated or using the `setLevel()` method. The `logLevel` property contains the string of the current log level and is read only.

The default log level is `Info`.

```JavaScript
import Logger from 'simple-level-logger';
const log = new Logger();
log.warn('This is a warning.');
// Warn: This is a warning.
log.verbose('This message won\'t display.');
log.setLevel('debug');
log.verbose('This is a verbose message.');
// Verbose: This is a verbose message.
```

## Develop

To add features to this module, git clone the repository, run `npm install`, add tests, make changes.
