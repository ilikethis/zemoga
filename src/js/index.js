'use strict';

import {init as characterInit} from './components/character-component';
import {init as votesInit} from './components/poll-component';

(function(window) {
  document.addEventListener('DOMContentLoaded', () => {
    characterInit();
    votesInit();
  });
})(window);