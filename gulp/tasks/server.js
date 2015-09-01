var gulp        = require('gulp');
var browserSync = require('browser-sync');
var util        = require('gulp-util');
var config      = require('../config');

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: [config.dest.root, config.src.root],
            directory: false
        },
        files: [
            config.dest.html + '/*.html',
            config.dest.css + '/*.css',
            config.dest.img + '/**/*'
        ],
        port: 8080,
        logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
        logConnections: false,
        logFileChanges: true,
        open: Boolean(util.env.open),
        notify: false,
        ghostMode: false,
        online: Boolean(util.env.tunnel),
        tunnel: typeof util.env.tunnel === 'string' ? util.env.tunnel : null
    });
});
