const gulp            = require('gulp');
const nunjucks        = require('gulp-nunjucks');
const bs              = require('browser-sync');
const data            = require('../../src/data/data.json');
const constants       = require('../constants');
/**
 * Registers the `gulp js` task that compiles js with local closure compiler.
 * @return A Gulp stream object.
 */
module.exports = () => {
  // Compile nunjucks templates to HTML
  gulp.task('templates', () => {
    gulp.src('src/templates/**/*.html')
    .pipe(bs.reload({stream: true}))
    .pipe(nunjucks.compile(data))
    .pipe(gulp.dest(constants.templateDist))
  });
};