var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var runSequence = require('run-sequence');

var fs = require('fs');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps'); //转换前的每行源码的位置会对应到转换後的位置，出错时，像Chrome/Firefox开发者工具会直接显示原始源码，而非转换后的源码
var gutil = require('gulp-util');
var rename = require('gulp-rename');

var image = require('gulp-image');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var cleanCss = require('gulp-clean-css');


/**************** actions start **********************************************************************/

// A build task which prepare
gulp.task('build', function () {
  runSequence(
    'build-fe',
    'build-ui',
    function () {
      // console.log('Already rebuild and deploy.');
    }
  );
});

// front end : build only js and html
gulp.task('build-fe', function () {
  runSequence(
    'build-style',
    'build-script',
    'build-html',
    function () {}
  );
});

// ui : build only ui and css
gulp.task('build-ui', function () {
  runSequence(
    'build-fonts',
    'build-images',
    'build-design-style',
    'build-design-script',
    function () {}
  );
});

/**************** actions end **********************************************************************/


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

// optimize the image and deploy the dist/img directory.
gulp.task('build-images', function () {
  return gulp.src('./dev/images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/css/images'))
    .pipe(notify('build-images has optimized.'));
});

gulp.task('build-fonts', function () {
  return gulp.src('./dev/fonts/**')
    .pipe(gulp.dest('./dist/css/fonts'))
    .pipe(notify('build-fonts is complete.'));
});

gulp.task('build-style', function () {
  return gulp.src('./dev/style/*.css')
    .pipe(plumber())
    .pipe(cleanCss({
      debug: true
    }, function (detail) {
      let ds = detail.stats;
      let _msg = `minifing [${detail.name}]: before -> ${ds.originalSize} KB, after -> ${ds.minifiedSize} KB, reduced ${parseInt(ds.efficiency * 100)}%`;
      console.log(_msg);
    }))
    .pipe(rename({
      dirname: './dist/css'
    }))
    .pipe(gulp.dest('./'))
    .pipe(notify('built-style is complete.'));
});

gulp.task('build-design-style', function () {
  return gulp.src('./dev/style/design/**', {
      base: './dev/style/design'
    })
    .pipe(gulp.dest('./dist/css/assets'))
    .pipe(notify('build-design-style is complete.'));
});

// trigger a build task which performs following:
// 1. build in es2015 spec
// 2. use browserify to unify javascript code into a single js file.
// 3. minify the javascript code.
gulp.task('build-script', function () {

  const _path = './dev/script/';
  fs.readdir(_path, function (err, entries) {
    if (err) {
      console.logError(err);
      return;
    }

    // filter out the folder, only handle with javascript file.
    entries = entries.filter(function (_entry) {
      var stats = fs.statSync(_path + _entry);
      return stats.isFile();
    });

    entries.map(function (_entry) {

      _entry = _path + _entry;
      console.log(_entry);

      return browserify({
          entries: [_entry],
          debug: true
        })
        .transform(babelify, {
          presets: ['es2015']
        })
        .bundle()
        .pipe(plumber())
        .pipe(source(_entry))
        .pipe(buffer())
        // .pipe(sourcemaps.init({ loadMaps: true }))
        // .pipe(uglify())
        .on('error', gutil.log)
        .pipe(rename({
          dirname: './'
        }))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
      // .on('finish', function () {
      //   console.log('build-script is complete.');
      // })
      ;
    });
  });
});

gulp.task('build-design-script', function () {
  return gulp.src('./dev/script/design/**', {
      base: './dev/script/design'
    })
    .pipe(gulp.dest('./dist/js/assets'))
    .pipe(notify('build-design-script is complete.'));
});