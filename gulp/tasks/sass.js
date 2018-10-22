const gulp      = require('gulp');
const rename    = require('gulp-rename');
const sass      = require('gulp-sass');
const cleanCss  = require('gulp-clean-css');
const bs        = require('browser-sync');
const constants = require('../constants');

/**
 * Registers the `gulp js` task that compiles js with local closure compiler.
 * @return A Gulp stream object.
 */
module.exports = () => {
  // Compile CSS from Sass files
  gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss')
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(cleanCss({compatibility: 'ie10'}))
      .pipe(bs.reload({stream: true}))
      .pipe(gulp.dest(constants.sassDist));
  });
};
