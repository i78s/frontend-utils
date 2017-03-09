module.exports = function (config) {
  var webpackConfig = require('./webpack.config');

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/power-assert/build/power-assert.js',
      'node_modules/sinon/pkg/sinon.js',
      'src/ts/fixtures/**/*.html',
      'src/ts/**/*-spec.ts'
    ],

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // add webpack as preprocessor
      'src/ts/**/fixture.html': ['html2js'],
      'src/ts/**/*-spec.ts': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'], // PhantomJS


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    webpack: {
      devtool: 'none',
      resolve: webpackConfig.resolve,
      module: webpackConfig.module
    },
    webpackMiddleware: {
      noInfo: true
    },

    client: {
      captureConsole: true,
      mocha: {
        reporter: 'html'
      }
    }
  })
};
