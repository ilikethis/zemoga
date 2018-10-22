'use strict';

const path = require('path');
const recursiveReadSync = require('recursive-readdir-sync');
const browserSync = require('browser-sync').create('bs');


/**
 * Reads the gulp directory and requires every js file to register tasks.
 */
recursiveReadSync('./gulp/tasks')
    .filter(file => path.extname(file) === '.js')
    .forEach(file => require(path.join(__dirname, file))());
