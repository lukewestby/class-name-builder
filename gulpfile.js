var gulp = require('gulp');
var karma = require('karma').server;
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('build', function () {
    browserify({
        entries: './src/class-name-builder.js',
        standalone: 'class-name-builder'
    })
    .transform(babelify)
    .bundle()
    .pipe(source('class-name-builder.js'))
    .pipe(gulp.dest('./dist'));
});
