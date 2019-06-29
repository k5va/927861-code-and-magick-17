'use strict';

(function () {
  /**
 * Returns random element of an array
 * @param {Array} elements - array of some elements
 * @return {*} - random element of the given array
 */
  var getRandomElementFromArray = function (elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  // TODO: Need to return random elements?
  var getNRandomElementsFormArray = function (elements, n) {
    return elements.slice(0, n);
  };

  window.utils = {
    getRandomElementFromArray: getRandomElementFromArray,
    getNRandomElementsFormArray: getNRandomElementsFormArray
  };
})();
