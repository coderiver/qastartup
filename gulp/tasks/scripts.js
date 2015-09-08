var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var util        = require('gulp-util');
var filter      = require('gulp-filter');
var sourcemaps  = require('gulp-sourcemaps');
var size        = require('gulp-size');
var gulpif      = require('gulp-if');
var path        = require('path');
var _           = require('lodash');
var reload      = require('browser-sync').reload;
var config      = require('../config');

var appBundleName    = 'app.js';
var vendorBundleName = 'vendor.js';

var props = {
    dest: [config.dest.js],
    transform: ['coffeeify'],
    noParse: ['jquery'],
    extensions: ['.js', '.coffee'],
    debug: true,
    cache: {},
    packageCache: {}
};

function getNPMPackageIds() {
    var packageManifest = {};
    try {
        packageManifest = require('../../package.json');
    } catch (err) {
        util.log(util.colors.red(err));
    }
    return _.keys(packageManifest.dependencies) || [];
}

function getVendorPackagesManifest() {
    var manifest;
    try {
        manifest = require('../../app/js/vendor.coffee').map(function(item) {
            return {
                path: item,
                expose: path.parse(item).name
            };
        });
    } catch (err) {
        util.log(util.colors.red(err));
    }
    // util.log(manifest);
    return manifest || [];
}

function bundle(bundler, outputName) {
    return bundler
        .bundle()
        .on('error', config.errorHandler)
        .pipe(source(outputName))
        .pipe(buffer())
        .pipe(gulpif(config.production, size()))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulpif(config.production, uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.js))
        .pipe(gulpif(config.production, filter(['*.js'])))
        .pipe(gulpif(config.production, size()))
        .pipe(reload({ stream: true }));
}

gulp.task('scripts', ['scripts:app', 'scripts:vendor']);

gulp.task('scripts:app', function() {
    var bundler = browserify(props);
    getVendorPackagesManifest().forEach(function(module) {
        bundler.external(module.path);
    });
    bundler.add(path.join(config.src.js, 'app.coffee'));
    return bundle(bundler, appBundleName);
});

gulp.task('scripts:vendor', function() {
    var bundler = browserify(props);
    getVendorPackagesManifest().forEach(function(module) {
        bundler.require(module.path, {expose: module.expose});
        util.log('Added to vendor bundle: ', module);
    });
    return bundle(bundler, vendorBundleName);
});

gulp.task('scripts:watch', function() {
    var bundler = watchify(browserify(props));
    getVendorPackagesManifest().forEach(function(module) {
        bundler.external(module.path);
    });
    bundler.add(path.join(config.src.js, 'app.coffee'));
    bundler.on('log', util.log);
    bundler.on('update', function() {
        bundle(bundler, appBundleName);
    });
    return bundle(bundler, appBundleName);
});
