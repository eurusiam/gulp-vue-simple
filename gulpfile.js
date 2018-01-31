var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

require('./gulp/scripts/build.js');
require('./gulp/scripts/clean.js');

var _port = 8080;

// default task, run a build task to deploy.
gulp.task('default', function(cb) {
    gulp.start('start:fe', cb);
});

// start a server 
gulp.task('server', function() {
    connect.server({
      root: 'dist',
      host:'192.168.128.01',
      port: _port,
      livereload: true
    })
});

// browserSync a server without any additional operation.
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: "index.html"
        },
        port: _port
    });
});

//start all clean and build include front-end and ui 
gulp.task('start:fe' ,  function(cb) {
    runSequence(
        'clean-fe',
        'build-fe',
        'watch-fe',
        'browserSync'
    );
});

//start all clean and build include front-end and ui 
gulp.task('start:all' ,  function(cb) {
    // gulp.start('build', cb);
    runSequence(
        'clean',
        'build',
        'watch',
        'browserSync'
    );
});

// watch changes of front-end
gulp.task('watch-fe', function() {
    gulp.watch(
        [
          './dev/*', './dev/**/*', './dev/**/**/*'
        ]
        , ['build-fe']
        ,browserSync.reload
    );
});

// watch all changes for ui and front-end
gulp.task('watch', function() {
    gulp.watch(
        [
          './dev/*', './dev/**/*', './dev/**/**/*'
        ]
        , ['build']
        ,browserSync.reload
    );
});










