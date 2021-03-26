/* eslint-disable no-console */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { default: Logger } = require('../dist/logger');

chai.use(sinonChai);

const { expect } = chai;

beforeEach(() => {
  this.log = new Logger();
  sinon.spy(console, 'log');
});

afterEach(() => {
  console.log.restore();
});

describe('Log with logLevel Info', () => {
  it('should print "Info: test"', () => {
    this.log.info('test');
    expect(console.log).to.be.calledWith('Info:', 'test');
  });

  it('should print out an object', () => {
    this.log.info({ data: 'data', message: { title: 'Title', body: 'body' } });
    expect(console.log).to.be.calledWith('Info:', { data: 'data', message: { title: 'Title', body: 'body' } });
  });

  it('should print "Info: testing test"', () => {
    this.log.info('testing', 'test');
    expect(console.log).to.be.calledWith('Info:', 'testing', 'test');
  });

  it('should not print "Debug: test"', () => {
    this.log.debug('test');
    expect(console.log).to.not.be.calledWith('Debug:', 'test');
  });
  it('should output deep objects', () => {
    console.log('\n\nVisually inspect following output to make sure you do not see [object]\n\n');
    this.log.info({ this: { that: { theOther: { how: { deep: { does: { it: { go: { value: 'value' } } } } } } } } });
    // I haven't seen a way to test the actual output of console.log().
  });
});

describe('Log with logLevel Silly', () => {
  it('should print all messages', () => {
    this.log.setLevel('silly');
    this.log.error('test');
    expect(console.log).to.be.calledWith('Error:', 'test');
    this.log.warn('test');
    expect(console.log).to.be.calledWith('Warn:', 'test');
    this.log.info('test');
    expect(console.log).to.be.calledWith('Info:', 'test');
    this.log.verbose('test');
    expect(console.log).to.be.calledWith('Verbose:', 'test');
    this.log.debug('test');
    expect(console.log).to.be.calledWith('Debug:', 'test');
    this.log.silly('test');
    expect(console.log).to.be.calledWith('Silly:', 'test');
  });
});

describe('Function setLevel()', () => {
  it('should update current logLevel.', () => {
    sinon.spy(this.log, 'setLevel');
    this.log.setLevel('debug');
    expect(this.log.logLevel).to.equal('Debug');
    this.log.setLevel.restore();
  });
});
