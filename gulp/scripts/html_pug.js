var gulp = require('gulp'),
    notify = require('gulp-notify'),
    pug = require('gulp-pug');
// 路徑
var path = {
    pug: [
        './dev/app/pug/*.pug'
    ],
    html: './dist/'
};



// pug主程式
gulp.task('compilePug', function () {
    return gulp.src(path.pug)
        .pipe(pug({
            pretty: true
        }))
        .on('error', notify.onError(function (error) {
            return 'PUG編譯錯~~~~~~!\n  watch console \n' + error;
        }))
        .pipe(gulp.dest(path.html))
});