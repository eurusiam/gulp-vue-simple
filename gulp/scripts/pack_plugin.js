var gulp = require('gulp');

gulp.task('pack_plugin', function (name) {
console.log(name);
return gulp.src('./libs/*.js')
    .pipe(gulp.dest('./dest/assets/js/plugin/'));
});