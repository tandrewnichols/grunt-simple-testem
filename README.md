[![Build Status](https://travis-ci.org/tandrewnichols/grunt-simple-testem.png)](https://travis-ci.org/tandrewnichols/grunt-simple-testem) [![downloads](http://img.shields.io/npm/dm/grunt-simple-testem.svg)](https://npmjs.org/package/grunt-simple-testem) [![npm](http://img.shields.io/npm/v/grunt-simple-testem.svg)](https://npmjs.org/package/grunt-simple-testem) [![Maintainability](https://api.codeclimate.com/v1/badges/ac88c25408c831f81cf3f39a32b8fa273546e8ee4c76be309430eced69c134e0/maintainability)](https://codeclimate.com/github/tandrewnichols/grunt-simple-testem/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/ac88c25408c831f81cf3f39a32b8fa273546e8ee4c76be309430eced69c134e0/test_coverage)](https://codeclimate.com/github/tandrewnichols/grunt-simple-testem/test_coverage) [![dependencies](https://david-dm.org/tandrewnichols/grunt-simple-testem.png)](https://david-dm.org/tandrewnichols/grunt-simple-testem)

# grunt-simple-testem

A grunt wrapper for testem

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-simple-testem --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-simple-testem');
```

Alternatively, install [task-master](http://github.com/tandrewnichols/task-master) and let it manage this for you.

## The "testem" task

### Overview

In your project's Gruntfile, add a section named `testem` to the data object passed into `grunt.initConfig()`. This task is a [simple-cli](https://github.com/tandrewnichols/simple-cli) task, so it can be configured in accordance with the examples there. A simple example is:

```js
grunt.initConfig({
});

// grunt testem:cover will run
// testem --cwd server --include lib/** --include routes/** --exclude *.test.*
//   --reporter--reporter--reporter--reporter lcov --reporter text-summary
//   --report-dir server/coverage --all grunt mocha:unit
//
// whereas grunt testem:report will run
// testem report --reporter text-summary
```

If you need to pass arguments to the process that runs your tests (`grunt mocha:unit` in the example above), you need to add them to `args` _after_ the command name (alternatively, you can add them in `rawArgs`). E.g.

```js
grunt.initConfig({
  cover: {
    cmd: false,
    args: ['grunt', 'mocha:unit', '--require', 'should']
  }
});

// or

grunt.initConfig({
  cover: {
    cmd: false,
    args: ['grunt', 'mocha:unit'],
    rawArgs: ['--require', 'should']
  }
});
```

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
