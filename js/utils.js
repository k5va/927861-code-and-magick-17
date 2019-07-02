'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  /**
 * Returns random element of an array
 * @param {Array} elements - array of some elements
 * @return {*} - random element of the given array
 */
  var getRandomElementFromArray = function (elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  /**
   * Renders given error messsage to the DOM
   * @param {string} errorMessage - error message
   */
  var displayErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  /**
   * Debounces given function - returns new function, that calls callback only after DEBOUNCE_INTERVAL is passed
   * @param {function} callback - callback function
   * @return {function} - debounced function
   */
  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.utils = {
    getRandomElementFromArray: getRandomElementFromArray,
    displayErrorMessage: displayErrorMessage,
    debounce: debounce
  };
})();
