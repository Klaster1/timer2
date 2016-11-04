const gulp = require('gulp')
const sass = require('gulp-sass')
const path = require('path')
const sourcemaps = require('gulp-sourcemaps')
const changed = require('gulp-changed')
const connect = require('gulp-connect')
const history = require('connect-history-api-fallback')

const paths = {
	app: './src',
	styles: '**/style.scss',
}

gulp.task('sass', function() {
	return gulp.src(path.join(paths.app, paths.styles))
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(changed(paths.app))
		.pipe(sourcemaps.write('.', {
			sourceRoot: '..'
		}))
		.pipe(gulp.dest(paths.app))
})

gulp.task('watch-styles', function() {
	gulp.watch(path.join(paths.app, paths.styles), ['sass'])
})

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true,
    middleware: function(connect, opt) {
      return [ history() ];
    }
  });
})

gulp.task('default', ['watch-styles', 'connect'])