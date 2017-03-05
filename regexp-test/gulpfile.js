const gulp = require('gulp');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');

gulp.task('default',['js','css','html']);

gulp.task('js', ()=>{
	return gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('docs/js/'));
});

gulp.task('css', ()=>{
	return gulp.src('src/css/*.css')
		.pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
		.pipe(gulp.dest('docs/css/'));
});

gulp.task('html', ()=>{
	return gulp.src('src/index.html')
		.pipe(gulp.dest('docs/'));
});