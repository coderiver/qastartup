var gulp    = require('gulp');
var jade    = require('gulp-jade');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var gulpif  = require('gulp-if');
var config  = require('../config');

function renderHtml(onlyChanged) {
    return gulp
        .src(config.src.jade + '/[^_]*.jade')
        .pipe(plumber({ errorHandler: config.errorHandler }))
        gulpif
        .pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest(config.dest.html));
}

gulp.task('jade', function() {
    return renderHtml(true);
});

gulp.task('jade:all', function() {
    return renderHtml();
});

gulp.task('jade:watch', function() {
    gulp.watch(config.src.jade + '/**/[^_]*.jade', ['jade']);
    gulp.watch(config.src.jade + '/**/_*.jade', ['jade:all']);
});
