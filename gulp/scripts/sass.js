var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    plumber = require('gulp-plumber');
//路徑



var web = {
    sass: [
        'dev/sass/*.scss',
        'dev/sass/**/*.scss',
        'dev/sass/**/**/*.scss',
        'dev/sass/**/**/**/*.scss'
    ]
};


// autoprefixer  前綴字
gulp.task('styles' ,['sass'], function () {
    var plugins = [
        autoprefixer({
            broswer: ['last 1 vrsion']
        })
    ];
    return gulp.src('./dist/assets/css/*.css')
        .pipe(gulpPlumber())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dist/assets/css/autoprefixer/'));
});

//  sass
gulp.task('sass', function () {
    return gulp.src(web.sass) //要處理的scss檔案
        //  .pipe(gulpPlumber())
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: notify.onError("Sass錯誤訊息 : <%= error.message %>")}))
        .pipe(sass({
            outputStyle: 'expanded',// compact , expanded, nested
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/css/')) //指定編譯後的路徑       
});


