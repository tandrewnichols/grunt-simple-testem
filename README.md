[![Build Status](https://travis-ci.org/tandrewnichols/grunt-simple-testem.svg?branch=master)](https://travis-ci.org/tandrewnichols/grunt-simple-testem) [![downloads](http://img.shields.io/npm/dm/grunt-simple-testem.svg)](https://npmjs.org/package/grunt-simple-testem) [![npm](http://img.shields.io/npm/v/grunt-simple-testem.svg)](https://npmjs.org/package/grunt-simple-testem) [![Maintainability](https://api.codeclimate.com/v1/badges/86d042be4a9f121bc143/maintainability)](https://codeclimate.com/github/tandrewnichols/grunt-simple-testem/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/86d042be4a9f121bc143/test_coverage)](https://codeclimate.com/github/tandrewnichols/grunt-simple-testem/test_coverage) [![dependencies](https://david-dm.org/tandrewnichols/grunt-simple-testem.png)](https://david-dm.org/tandrewnichols/grunt-simple-testem)

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

In your project's Gruntfile, add a section named `testem` to the data object passed into `grunt.initConfig()`. This is a thin wrapper around the testem API, so any of [the valid options](https://github.com/testem/testem/blob/master/lib/api.js#L22) for testem will work here. A simple example is:

```js
grunt.initConfig({
  testem: {
    unit: {
      options: {
        src_files: ['lib/**/*.js'],
        fail_on_zero_tests: true,
        framework: 'jasmine',
        launch_in_dev: ['PhantomJS', 'Chrome', 'Firefox'],
        launch_in_ci: ['PhantomJS']
      }
    }
  }
});
```

Testem has two different modes: `dev` and `ci` (errrrr . . . and also `server` . . . which is present here and works but I've never used it so I don't know what it does). If a particular task should have a default mode, you can pass that as "mode," but you can also override it from the command line by passing it as an argument to the task. E.g.

```js
grunt.initConfig({
  testem: {
    unit: {
      mode: 'ci'
      options: {
        // . . . etc
      }
    }
  }
});
```

Here, running `grunt testem:unit` will launch testem in ci mode, but you can override that by running `grunt testem:unit:dev`.

If no mode is provided in the configuration or via command line, it defaults to `dev`.

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
