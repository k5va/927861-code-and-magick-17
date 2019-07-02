'use strict';

(function () {
  var WIZARDS_NUMBER = 4;

  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var wizards = null;

  /**
   * Creates wizard DOM Element from given template and wizard object
   * @param {Object} wizard - wizard object containing data
   * @return {Node} wizardElement - created wizard DOM element
   */
  var createWizardElement = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  /**
   * Creates wizards' DOM elements and renders them to the DOM
   * @param {Array} similarWizards - wizards data array
   */
  var renderWizards = function (similarWizards) {
    var fragment = document.createDocumentFragment();

    similarWizards.forEach(function (wizard) {
      fragment.appendChild(createWizardElement(wizard));
    });

    // remove all previous similar wizards
    setupSimilarList.innerHTML = '';
    // add new similar wizards
    setupSimilarList.appendChild(fragment);
  };

  /**
   * Calculates and returns similar wizard's rank
   * @param {Object} wizard - similar wizard object
   * @param {string} colorCoat - player's coat color
   * @param {string} colorEyes - player's eyes color
   * @return {number} - wizard's rank
   */
  var getRank = function (wizard, colorCoat, colorEyes) {
    var rank = 0;

    if (wizard.colorCoat === colorCoat) {
      rank += 2;
    }

    if (wizard.colorEyes === colorEyes) {
      rank += 1;
    }

    return rank;
  };

  /**
   * Updates similar wizards list and renders it to the DOM
   * @param {string} colorCoat - player's coat color
   * @param {string} colorEyes - player's eyes color
   */
  var update = function (colorCoat, colorEyes) {
    // check if wizards are loaded
    if (wizards === null) {
      return;
    }

    renderWizards(
        wizards
          .sort(function (wizardLeft, wizardRight) {
            return getRank(wizardRight, colorCoat, colorEyes) - getRank(wizardLeft, colorCoat, colorEyes);
          })
          .slice(0, WIZARDS_NUMBER)
    );
  };

  /**
   * Wizards load success handler. Renders WIZARDS_NUMBER wizards objects.
   * @param {Array} data - array of loaded wizards objects
   */
  var onWizardsLoadSuccess = function (data) {
    wizards = data;
    update();
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

  window.similarWizards = {
    // export debounced version
    update: window.utils.debounce(update)
  };

})();
