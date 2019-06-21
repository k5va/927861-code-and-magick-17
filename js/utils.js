'use strict';

(function () {
  /**
 * Returns random element of an array
 * @param {Array} elements - array of some elements
 * @return {object} - random element of the given array
 */
  var getRandomElementFromArray = function (elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  window.utils = {
    getRandomElementFromArray: getRandomElementFromArray
  };
})();
