const Testem = require('testem');
const modes = {
  dev: 'startDev',
  ci: 'startCI',
  server: 'startServer'
};

const defaults = {
  reporter: 'dot'
};

module.exports = (grunt) => {
  grunt.registerMultiTask('testem', "Got scripts? Testem'!", function(mode) {
    const done = this.async();
    const options = Object.assign({}, this.options(defaults));
    const testem = new Testem;
    mode = this.data.mode || mode || 'dev';

    testem[ modes[mode] ](options, (code) => {
      done(typeof code === 'undefined' || code === 0);
    });
  });
};
