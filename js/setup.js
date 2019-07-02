'use strict';

(function () {
  var WIZARDS_NUMBER = 4;

  /**
   * Creates wizard DOM Element from given template and wizard object
   * @param {Node} wizardTemplate - template for creating wizard element
   * @param {object} wizard - wizard object containing data
   *
   * @return {Node} wizardElement - created wizard DOM element
   */
  var createWizardElement = function (wizardTemplate, wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  /**
   * Creates wizards' DOM elements and renders them to the DOM
   * @param {Array} wizards - wizards data array
   */
  var renderWizards = function (wizards) {
    var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var setupSimilarList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createWizardElement(wizardTemplate, wizards[i]));
    }

    setupSimilarList.appendChild(fragment);
  };

  /**
   * Wizards load success handler. Renders WIZARDS_NUMBER wizards objects.
   * @param {Array} wizards - array of loaded wizards objects
   */
  var onWizardsLoadSuccess = function (wizards) {
    renderWizards(window.utils.getNRandomElementsFromArray(wizards, WIZARDS_NUMBER));
  };

  /**
   * Wizards load error handler. Displays error message
   * @param {string} errorMessage - error message
   */
  var onWizardsLoadError = function (errorMessage) {
    window.utils.displayErrorMessage(errorMessage);
  };

  // load similar wizards data from backend and render them
  window.backend.load(onWizardsLoadSuccess, onWizardsLoadError);

})();
