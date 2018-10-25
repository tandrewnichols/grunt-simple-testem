module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-travis-matrix');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-simple-nyc');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadTasks('./tasks');

  grunt.initConfig({
    clean: {
      coverage: ['coverage']
    },
    eslint: {
      tasks: {
        options: {
          configFile: '.eslint.json',
          format: 'node_modules/eslint-codeframe-formatter'
        },
        src: ['tasks/**/*.js']
      }
    },
    shell: {
      codeclimate: 'npm run codeclimate'
    },
    travisMatrix: {
      v8: {
        test: function() {
          return /^v8/.test(process.version);
        },
        tasks: [ 'nyc:unit', 'shell:codeclimate' ]
      }
    },
    mochaTest: {
      options: {
        reporter: 'list',
        require: [ 'should', 'should-sinon' ],
        timeout: 3000
      },
      test: {
        src: ['test/**/*.js']
      },
      watch: {
        options: {
          reporter: 'dot'
        },
        src: ['test/**/*.js']
      }
    },
    nyc: {
      unit: {
        cmd: false,
        args: [ 'grunt', 'mocha' ],
        env: {
          FORCE_COLOR: true
        },
        options: {
          include: ['tasks/**'],
          tempDirectory: '.nyc',
          reportDir: 'coverage',
          reporter: [ 'text-summary', 'lcov' ],
          all: true
        }
      }
    },
    open: {
      coverage: {
        path: 'coverage/lcov-report/index.html'
      }
    },
    watch: {
      tests: {
        files: [ 'tasks/**/*.js', 'test/**/*.js' ],
        tasks: [ 'eslint:tasks', 'mochaTest:watch' ],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.registerTask('mocha', ['mochaTest:test']);
  grunt.registerTask('test', ['mochaTest:test']);
  grunt.registerTask('default', [ 'eslint:tasks', 'mocha' ]);
  grunt.registerTask('cover', [ 'nyc:unit', 'open:coverage' ]);
  grunt.registerTask('travis', [ 'eslint:tasks', 'mocha', 'travisMatrix' ]);
};
