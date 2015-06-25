// Karma configuration
// Generated on Thu Jun 18 2015 19:38:52 GMT-0500 (CDT)

module.exports = function(config) {
    config.set({

        basePath: '.',

        frameworks: ['browserify', 'mocha', 'chai'],

        files: [
            'test/*.test.js'
        ],

        preprocessors: {
            'src/**/*.js': ['browserify'],
            'test/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify']
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_ERROR,

        autoWatch: false,

        browsers: ['PhantomJS'],

        singleRun: true,

        plugins: [
            'karma-browserify',
            'karma-mocha',
            'karma-chai',
            'karma-phantomjs-launcher'
        ]
    });
};
