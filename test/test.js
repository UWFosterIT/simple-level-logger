import chai from 'chai';
import log from '../dist/logger';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

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
    expect(console.log).to.be.calledWith('Info: test');
  });

  it('should not print "Debug: test"', () => {
    log.debug('test');
    expect(console.log).to.not.be.calledWith('Debug: test');
  });
});

describe('Log with logLevel Silly', () => {
  it('should print all messages', () => {
    log.setLevel('silly');
    log.error('test');
    expect(console.log).to.be.calledWith('Error: test');
    log.warn('test');
    expect(console.log).to.be.calledWith('Warn: test');
    log.info('test');
    expect(console.log).to.be.calledWith('Info: test');
    log.verbose('test');
    expect(console.log).to.be.calledWith('Verbose: test');
    log.debug('test');
    expect(console.log).to.be.calledWith('Debug: test');
    log.silly('test');
    expect(console.log).to.be.calledWith('Silly: test');

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
