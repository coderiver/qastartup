var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

gulp.task('default', [
    'server',
    'watch'
]);

gulp.task('build', ['clean'],  function(cb) {
    runSequence(
        'iconfont',
        'imagemin',
        'sass',
        'html:all',
        'scripts',
        'copy:all'
    );
    cb();
});

gulp.task('watch', [
    'sass:watch',
    'iconfont:watch',
    'imagemin:watch',
    'scripts:watch',
    'html:watch'
]);
