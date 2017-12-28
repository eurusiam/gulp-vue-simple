var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean');

require('gulp-param');

var _port = 6600,
    reload = browserSync.reload;

//plugin

var sass = require('./gulp/scripts/html_pug.js'),
    pug  = require('./gulp/scripts/sass.js');
 

gulp.task('default', ['serve:dist'], function (callback) {
  // console.log(callback);
});

// Start the server with dist files.
gulp.task('serve:dist', ['fileinclude', 'watch'], function () {
  browserSync.init({
    port: _port,
    server: {
      baseDir: 'dist',
      index: "index.html"
    }
  });
  //watch sass
  gulp.watch('', ['styles']).on('change', reload); //watch  sass

});
// package pure html, js, css to folder 'dist'
gulp.task('fileinclude', ['pack_js', 'pack_plugin'], function () {
  return gulp.src(['./dev/app/html/*.html', './dev/js/*.js'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist'))
    .on('finish', function () {});
});

// Set files to watch for updates
gulp.task('watch', function () {
  gulp.watch(['./dev/app/html/*.html', './dev/js/*.js'], ['fileinclude']).on('change', reload);

});

// clean dist version
gulp.task('clean', function () {
  return gulp.src(['./dist/*'], {
      read: false
    })
    .pipe(clean());
});

//package plugin js
gulp.task('pack_plugin', function () {
  return gulp.src(['./libs/jquery/dist/jquery.min.js', 
                   './libs/vue/dist/vue.min.js'
                  ])
    .pipe(gulp.dest('./dist/assets/js/plugin/'));
});

// gulp.task('pack_plugin', function (name) {
//   console.log(name);
//   return gulp.src('./libs/*.js')
//     .pipe(gulp.dest('./dest/assets/js/plugin/'));
// });

//package js
gulp.task('pack_js', function () {
  return gulp.src('./dev/js/*')
    .pipe(gulp.dest('./dist/assets/js/'));

});
