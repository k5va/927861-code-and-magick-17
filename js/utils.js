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
  var getNRandomElementsFromArray = function (elements, n) {
    return elements.slice(0, n);
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

  window.utils = {
    getRandomElementFromArray: getRandomElementFromArray,
    getNRandomElementsFromArray: getNRandomElementsFromArray,
    displayErrorMessage: displayErrorMessage
  };
})();
