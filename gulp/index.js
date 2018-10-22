'use strict';

const path = require('path');
const recursiveReadSync = require('recursive-readdir-sync');



/**
 * Reads the gulp directory and requires every js file to register tasks.
 */
recursiveReadSync(path.join(__dirname, 'tasks'))
    .filter(file => {
      console.log(file);
      return path.extname(file) === '.js';
    })
    .forEach(file => {
      console.log('ay', file, require(file)());
    });
