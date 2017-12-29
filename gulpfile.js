var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var notify = require('gulp-notify');

var image = require('gulp-image');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');  
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var gutil = require('gulp-util');

var _port = 8080;

// default task, run a build task to deploy.
gulp.task('default', function(cb) {
    gulp.start('build', cb);
});

// A build task which prepare
gulp.task('build', function() {
    runSequence(
        // 'clean',
        'build-image', 
        'build-style', 
        'build-script',
        // 'clean-script-map', // survey how to resolve in build-script phrase.
        'build-html',
        function() {
            console.log('Already rebuild and deploy.');
        }
    );
});

gulp.task('start:dev', ['watch'], function () {

    gulp.watch([
        'dist/**/*',
        'dist/*'
    ], browserSync.reload);

    browserSync.init({
        server: {
            baseDir: 'dist',
            index: "index.html"
        },
        port: _port
    });
});

gulp.task('watch', function() {
    gulp.watch(['./dev/*', './dev/**/*'], ['build']);
});


gulp.task('build-html', function () {
    
    return gulp.src('./dev/view/*.html')
                .pipe(fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                }))
                .pipe(gulp.dest('./dist'))
                .on('finish', function () {
                    console.log('build-html is complete.');
                });
});

gulp.task('build-style', function () {
    return gulp.src('./dev/**/*.css')
        .pipe(plumber())
        .pipe(cleanCss({
            debug: true
        }, function(detail) {
            let ds = detail.stats;
            let _msg = `minifing [${detail.name}]: before -> ${ds.originalSize} KB, after -> ${ds.minifiedSize} KB, reduced ${parseInt(ds.efficiency * 100)}%`;
            console.log(_msg);
        }))
        .pipe(rename({ dirname: './dist/css' }))
        .pipe(gulp.dest('./'))
        .pipe(notify('built-style is complete.'));
});

gulp.task('build-image', function () {
    return gulp.src('./dev/images/*')
                .pipe(image())
                .pipe(gulp.dest('./dist/img'))
                .pipe(notify('image has optimized.'));
});

gulp.task('build-script', function () {

    const _path = './dev/script/';
    fs.readdir(_path, function (err, entries) {

        if (err) {
            console.logError(err);
            return;
        }

        entries.map(function (_entry) {

            _entry = _path + _entry;

            return browserify({
                entries: [_entry],
                debug: true
            })
                .transform(babelify, { presets: ['es2015'] })
                .bundle()
                .pipe(plumber())
                .pipe(source(_entry))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }))
                // .pipe(uglify())
                .on('error', gutil.log)
                .pipe(rename({ dirname: '/dist/js' }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./'));
        });
    });
});

// only start a server without any additional operation.
gulp.task('start', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: "index.html"
        },
        port: _port
    });
});

// remove all contents under the dist directory.
gulp.task('clean', function() {
    return gulp.src(`./dist/*`, { read: false })
        .pipe(clean());
});

gulp.task('clean-script-map', function() {
    return gulp.src(`./dist/js/*.map`, { read: false })
        .pipe(clean());
});
