var gulp = require("gulp");
var concat = require("gulp-concat");
var browserify = require('gulp-browserify');
var uglify = require("gulp-uglify");

var paths = {
    dist: './www/dist',
    css: './www/styles/*.css',
    scripts: './www/scripts/**/*.js'
}

var setupWatch = function() {
	for (var pathName in paths) {
		if (paths.hasOwnProperty(pathName)){
			gulp.watch(paths[pathName], function(){
			    concatCss();
			    browserifyJs();
			});
		}
	}
};

var concatCss = function() {
    gulp.src(paths.css)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.dist));
};

var browserifyJs = function() {
    gulp.src('./www/scripts/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist))
};

gulp.task('css', concatCss);
gulp.task('browserify', browserifyJs);
gulp.task('default', function() {
    concatCss();
    browserifyJs();
    //setupWatch();
});
