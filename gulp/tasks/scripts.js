var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var util        = require('gulp-util');
var sourcemaps  = require('gulp-sourcemaps');
var size        = require('gulp-size');
var gulpif      = require('gulp-if');
var reload      = require('browser-sync').reload;
var config      = require('../config');

var props = {
    entries: ['./' + config.src.js + '/app.coffee'],
    dest: [config.dest.js],
    paths: ['./node_modules', './app/js/'],
    transform: ['coffeeify'],
    extensions: ['.js', '.coffee'],
    outputName: 'app.js',
    debug: true,
    cache: {},
    packageCache: {}
};

function bundle(bundler) {
    return bundler
        .bundle()
        .on('error', config.errorHandler)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(size())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulpif(config.production, uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.js))
        .pipe(size())
        .pipe(reload({ stream: true }));
}

gulp.task('scripts', function() {
    var bundler = browserify(props);
    return bundle(bundler);
});

gulp.task('scripts:watch', function() {
    var bundler = watchify(browserify(props));
    bundler.on('log', util.log);
    bundler.on('update', function() {
        bundle(bundler);
    });
    return bundle(bundler);
});
