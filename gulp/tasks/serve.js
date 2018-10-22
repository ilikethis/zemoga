const gulp      = require('gulp');
const browserSy = require('browser-sync');

/**
 * @fileoverview Defines the `gulp serve` task, which compiles sass/js and
 * starts up a browsersync proxy to port 9090 (default jc port), opens it in
 * the default browser, and navigates to the landing page.
 */
module.exports = () => {
  // start local server
  gulp.task('serve', function() {
    browserSy({
      server: {
        baseDir: 'build',
      },
      open: false
    });
  });
};
