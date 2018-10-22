const gulp      = require('gulp');
const constants = require('../constants');

/**
 * Registers the `gulp watch` task that compiles js, sass, starts browsersync,
 * begins watching templates, js, and sass code respectively, recompiling and
 * refreshing browsersync after changes.
 */
module.exports = () => {
  // Watch for changes in files
  gulp.task('watch', function() {
    // Watch .js files
    gulp.watch(constants.src + 'js/**/*.js', ['js']);

    // Watch .scss files
    gulp.watch(constants.src + 'scss/**/*.scss', ['sass']);

    // Watch templates
    gulp.watch(constants.src + 'templates/**/*.html', ['templates']);
  });
};
