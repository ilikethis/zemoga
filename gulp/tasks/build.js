'use strict';

const gulp = require('gulp');

/**
 * Registers the `gulp build` tasks that build and lint
 * the front end for the project.
 */
module.exports = () => {

  // Build for running locally.
  gulp.task('build',  ['js', 'sass', 'lint:js', 'lint:sass', 'templates', 'assets']);

};
