const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

describe('testem', () => {
  const grunt = {
    registerMultiTask: sinon.stub()
  };

  const thisArg = {
    async: sinon.stub(),
    options: sinon.stub()
  };

  const doneFn = sinon.stub();
  thisArg.async.returns(doneFn);

  const testem = {
    startDev: sinon.stub(),
    startCI: sinon.stub(),
    startServer: sinon.stub()
  };

  thisArg.options.returnsArg(0);

  class Testem {
    constructor() {
      Object.assign(this, testem);
    }
  }

  const subject = proxyquire('../tasks/testem', { 'testem': Testem });

  context('mode is dev', () => {
    thisArg.data = {
      mode: 'dev'
    };

    grunt.registerMultiTask.callsArgOn(2, thisArg);
    subject(grunt);

    it('should call testem.startDev', () => {
      testem.startDev.should.have.been.calledWith({ reporter: 'dot' }, sinon.match.func);
    });
  });

  context('mode is ci', () => {
    thisArg.data = {
      mode: 'ci'
    };

    grunt.registerMultiTask.callsArgOn(2, thisArg);
    subject(grunt);

    it('should call testem.startCI', () => {
      testem.startCI.should.have.been.calledWith({ reporter: 'dot' }, sinon.match.func);
    });
  });

  context('mode is server', () => {
    thisArg.data = {
      mode: 'server'
    };
    grunt.registerMultiTask.callsArgOn(2, thisArg);
    subject(grunt);

    it('should call testem.startServer', () => {
      testem.startServer.should.have.been.calledWith({ reporter: 'dot' }, sinon.match.func);
    });
  });

  context('mode is provided via command line', () => {
    thisArg.data = {};
    grunt.registerMultiTask.callsArgOnWith(2, thisArg, 'server');
    subject(grunt);

    it('should call testem.startServer', () => {
      testem.startServer.should.have.been.calledWith({ reporter: 'dot' }, sinon.match.func);
    });
  });

  context('mode is provided via command line AND the task configuration', () => {
    thisArg.data = {
      mode: 'ci'
    };
    grunt.registerMultiTask.callsArgOnWith(2, thisArg, 'server');
    subject(grunt);

    it('should use the passed in mode first', () => {
      testem.startServer.should.have.been.calledWith({ reporter: 'dot' }, sinon.match.func);
    });
  });

  context('mode is not provided', () => {
    thisArg.data = {};
    grunt.registerMultiTask.callsArgOn(2, thisArg);
    subject(grunt);

    it('should call testem.startDev', () => {
      testem.startDev.should.have.been.calledWith({ reporter: 'dot' }, sinon.match.func);
    });
  });

  context('the done callback with a 0 code', () => {
    thisArg.data = {};
    grunt.registerMultiTask.callsArgOn(2, thisArg);
    subject(grunt);
    testem.startDev.callsArgWith(1, 0);

    it('should call done with true', () => {
      doneFn.should.have.been.calledWith(true);
    });
  });

  context('the done callback with a positive code', () => {
    thisArg.data = {};
    grunt.registerMultiTask.callsArgOn(2, thisArg);
    subject(grunt);
    testem.startDev.callsArgWith(1, 1);

    it('should call done with false', () => {
      doneFn.should.have.been.calledWith(false);
    });
  });

  context('the done callback with a no code', () => {
    thisArg.data = {};
    grunt.registerMultiTask.callsArgOn(2, thisArg);
    subject(grunt);
    testem.startDev.callsArg(1);

    it('should call done with true', () => {
      doneFn.should.have.been.calledWith(true);
    });
  });
});
