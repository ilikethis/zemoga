const gulp        = require('gulp');
const concat      = require('gulp-concat');
const rename      = require('gulp-rename');
const bs          = require('browser-sync');
const babel       = require('gulp-babel');
const browserify  = require('gulp-browserify');
const constants   = require('../constants');

/**
 * Registers the `gulp js` task that compiles js files.
 * @return A Gulp stream object.
 */
module.exports = () => {
  // Concatenate & Minify JS
  gulp.task('js', function() {
    return gulp.src(constants.src + 'js/**/*.js')
      .pipe(concat('main.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(babel({
        'presets': [
          ['minify', {
            builtIns: false,
            evaluate: false,
            mangle: false,
          }],
          'es2015',
        ]
      }))
      .pipe(browserify())
      .pipe(bs.reload({stream: true}))
      .pipe(gulp.dest(constants.jSdist));
    });
};
