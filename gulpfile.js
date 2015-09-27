
var gulp = require('gulp'),
    uglify = require ('gulp-uglify'),
    minifyCss = require('gulp-minify-css');
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');

// Gulp Tasks
gulp.task('scripts', function () {
    return gulp.src('js/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function () {
    return gulp.src('css/*.css')
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('lint', function() {
  return gulp.src('js/script.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch('js/*.js', ['scripts', 'lint']);
});

gulp.task('default', ['scripts', 'styles', 'lint', 'watch']);