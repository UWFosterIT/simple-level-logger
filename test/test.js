const chai = require('chai');
const log = require('../src/logger');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

let expect = chai.expect;

beforeEach(() => {
  log.init();
  sinon.spy(console, 'log');
});

afterEach(() => {
  console.log.restore();
});

describe('Log with logLevel Info', () => {
  it('should print "Info: test"', () => {
    log.info('test');
    expect(console.log).to.be.calledWith('Info:', 'test');
  });

  it('should print out an object', () => {
    log.info({ data: 'data', message: {title: 'Title', body: 'body'}});
    expect(console.log).to.be.calledWith('Info:', { data: 'data', message: {title: 'Title', body: 'body'}});
  });

  it('should print "Info: asdf test"', () => {
    log.info('asdf', 'test');
    expect(console.log).to.be.calledWith('Info:', 'asdf', 'test');
  });

  it('should not print "Debug: test"', () => {
    log.debug('test');
    expect(console.log).to.not.be.calledWith('Debug:', 'test');
  });
  it('should output deep objects', () => {
    console.log('\n\nVisually inspect following output to make sure you do not see [object]\n\n');
    log.info({this: { that: { theOther: { how: { deep: { does: {it: {go: { value: 'value'}}}}}}}}});
    // I haven't seen a way to test the actual output of console.log().
  });
});

describe('Log with logLevel Silly', () => {
  it('should print all messages', () => {
    log.setLevel('silly');
    log.error('test');
    expect(console.log).to.be.calledWith('Error:', 'test');
    log.warn('test');
    expect(console.log).to.be.calledWith('Warn:', 'test');
    log.info('test');
    expect(console.log).to.be.calledWith('Info:', 'test');
    log.verbose('test');
    expect(console.log).to.be.calledWith('Verbose:', 'test');
    log.debug('test');
    expect(console.log).to.be.calledWith('Debug:', 'test');
    log.silly('test');
    expect(console.log).to.be.calledWith('Silly:', 'test');

  });
});

describe('Function setLevel()', () => {
  it('should update current logLevel.', () => {
    sinon.spy(log, 'setLevel');
    log.setLevel('debug');
    expect(log.setLevel).to.have.returned('Debug');
    log.setLevel.restore();
  });
});
