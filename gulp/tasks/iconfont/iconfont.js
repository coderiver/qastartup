var gulp         = require('gulp');
var iconfont     = require('gulp-iconfont');
var svgmin       = require('gulp-svgmin');
var consolidate  = require('gulp-consolidate');
var config       = require('../../config');
var runTimestamp = Math.round(Date.now() / 1000);

gulp.task('iconfont', function() {
    return gulp.src([config.src.iconsFont + '/*.svg'])
        .pipe(svgmin())
        .pipe(iconfont({
            fontName: 'iconfont',
            // appendUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            timestamp: runTimestamp,
            normalize: true,
            fontHeight: 1001,
            fontStyle: 'normal',
            fontWeight: 'normal'
        }))
        .on('glyphs', function(glyphs, options) {
            gulp.src(__dirname + '/_iconfont.scss')
                .pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: 'iconfont',
                    fontPath: '../fonts/',
                    className: 'icon'
                }))
                .pipe(gulp.dest(config.src.sassGen));
        })
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('iconfont:watch', function() {
    gulp.watch(config.src.iconsFont + '/*.svg', ['iconfont']);
});
