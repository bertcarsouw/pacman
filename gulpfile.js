var gulp = require('gulp'),
	usemin = require('gulp-usemin'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean'),
	copy = require('gulp-copy');

gulp.task('default', ['clean', 'copy', 'usemin']);

gulp.task('usemin', function() {
  	return gulp.src('./*.html')
    	.pipe(usemin({ 
    		js: [ uglify() ]
    	}))
    	.pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
    return gulp.src('dist/').pipe(clean());
});

gulp.task('copy', function() {
	return gulp.src('sprites/*').pipe(copy('dist'));
});