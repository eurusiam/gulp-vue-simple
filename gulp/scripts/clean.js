var gulp = require('gulp');
var clean = require('gulp-clean');


// remove all contents under the dist directory.
gulp.task('clean', function() {
  return gulp.src(`./dist/*`, { read: false })
      .pipe(clean());
});

//remove only js and html
gulp.task('clean-fe', function() {
  return gulp.src([`./dist/css/*.css`,`./dist/js/*.js`, `./dist/*.html`], { read: false })
      .pipe(clean());
});


//remove only css and images
gulp.task('clean-ui', function() {
  return gulp.src([`./dist/style/*`, `./dist/images/*`], { read: false })
      .pipe(clean());
});


gulp.task('clean-script-map', function() {
  return gulp.src(`./dist/js/*.map`, { read: false })
      .pipe(clean());
});
