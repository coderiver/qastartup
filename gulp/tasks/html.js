var gulp     = require('gulp');
var fs       = require('fs');
var swig     = require('gulp-swig');
var plumber  = require('gulp-plumber');
var gulpif   = require('gulp-if');
var util     = require('gulp-util');
var changed  = require('gulp-changed');
var prettify = require('gulp-prettify');
var config   = require('../config');

// Default json data that will be passed to swig templates
// var defaultData = require('../../' + config.src.templatesData + '/defaults.json');
var defaultData;

function renderHtml(onlyChanged) {
    return gulp
        .src([
            config.src.templates + '/**/*.html',
            '!' + config.src.templates + '/layouts/**/*.*',
            '!' + config.src.templates + '/partials/**/*.*'
        ])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulpif(onlyChanged, changed(config.dest.root)))
        .pipe(swig({
            load_json: true,
            json_path: config.src.templatesData,
            defaults: {
                cache: false,
                locals: defaultData
            }
        }))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'
            preserve_newlines: true,
            // unformatted: [],
            end_with_newline: true
        }))
        .pipe(gulp.dest(config.dest.root));
}

gulp.task('html', function() {
    return renderHtml(true);
});

gulp.task('html:all', ['html:data'], function() {
    return renderHtml();
});

gulp.task('html:data', function(cb) {
    fs.readFile(config.src.templatesData + '/defaults.json', 'utf8', function(err, data) {
        if (err) {
            util.log(err);
            defaultData = {};
            cb();
        } else {
            try {
                defaultData = JSON.parse(data);
                cb();
            } catch (error) {
                util.log(util.colors.red('Error when parsing defaults.json'), error);
                cb();
            }
        }
    });
});

gulp.task('html:watch', ['html:data'],  function() {
    gulp.watch([
        config.src.templates + '/*.html'
    ], ['html']);

    gulp.watch([
        config.src.templates + '/{partials,layouts}/*.html',
        config.src.templatesData + '/*.json'
    ], ['html:all']);
});
