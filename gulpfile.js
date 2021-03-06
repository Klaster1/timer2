const gulp = require('gulp')
const sass = require('gulp-sass')
const path = require('path')
const sourcemaps = require('gulp-sourcemaps')
const changed = require('gulp-changed')
const sassJspm = require('sass-jspm-importer')

const paths = {
	app: './src',
	styles: '**/*style.scss'
}

gulp.task('sass', function() {
	return gulp.src(path.join(paths.app, paths.styles))
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			functions: Object.assign(
				sassJspm.resolve_function('/jspm_packages/'),
				{
					fixSlashes(exp) {
						return new sass.compiler.types.String(exp.getValue().replace(/\\/g, '\/'))
					}
				}
			),
			importer: sassJspm.importer
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

gulp.task('default', ['watch-styles'])