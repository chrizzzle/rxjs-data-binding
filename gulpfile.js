var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');

gulp.task('build-js', function () {

    gulp.src([
        'src/scripts.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserify({
            debug : true
        }))
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*'], ['build-js']);
});

gulp.task('default', ['build-js', 'watch']);