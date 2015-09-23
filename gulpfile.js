
var gulp = require('gulp'),
	uglify = require ('gulp-uglify'),
	rename = require("gulp-rename"),
	jshint = require('gulp-jshint');;

// Scripts Task
gulp.task('scripts', function () {
	return gulp.src('js/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function () {
	console.log('Runs styles');
});

gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
	gulp.watch('js/*.js', ['scripts', 'lint']);
});

gulp.task('default', ['scripts', 'styles', 'lint', 'watch']);