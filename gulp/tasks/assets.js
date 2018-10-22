const gulp = require('gulp');
const constants   = require('../constants');

/**
 * Registers the `gulp js` task that compiles js with local closure compiler.
 * @return A Gulp stream object.
 */
module.exports = () => {
  // Move assets to dest folder
  gulp.task('assets', function() {
    return gulp.src('src/assets/**/*')
      .pipe(gulp.dest(constants.assetsDist));
  });
};
