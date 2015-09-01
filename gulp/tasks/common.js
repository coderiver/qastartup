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
        'sprite:svg',
        'imagemin',
        'sass',
        'jade:all',
        'html:all',
        'scripts',
        'copy:fonts'
    );
    cb();
});

gulp.task('watch', [
    'sass:watch',
    'jade:watch',
    'iconfont:watch',
    'imagemin:watch',
    'sprite:svg:watch',
    'scripts:watch',
    'html:watch'
]);
