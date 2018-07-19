# Simple Level Logger

Simple Level Logger is a wrapper for console.log that enables reporting of log events based on a specified logging level. The levels follow the standard NPM logging levels: error, warn, info, verbose, debug, and silly.

This module works with Node.js version 8.11.1 and later.

## Install

    npm install simple-level-logger --save

## Use

Each log level has a helper function that specifies the message log level. If the logger log level is greater than or equal to the message log level, the message is sent to the console with the message log level prepended.

The logger log level can be set when the logger is initialized or using the setLevel() method.

The default log level is `Info`.

    import log from 'simple-level-logger';

    log.init();

    log.warn('This is a warning.');

    // Warn: This is a warning.

    log.verbose('This message won't display.');

    log.setLevel('debug');

    log.verbose('This is a verbose message.');

    // Verbose: This is a verbose message.

## Develop

To add features to this module, git clone the repository, run `npm install`, add tests, make changes.