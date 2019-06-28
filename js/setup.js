'use strict';

(function () {
  var WIZARDS_NUMBER = 4;
  // create mock data
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  /**
 * Generates wizards' data
 * @param {number} wizardsNumber - number of wizards to generate
 * @return {Array} - wizard objects array
 */
  var generateWizardsData = function (wizardsNumber) {
    // initialize wizards data array
    var wizards = [];
    // populate wizards with data
    for (var i = 0; i < wizardsNumber; i++) {
      wizards.push({
        name: window.utils.getRandomElementFromArray(FIRST_NAMES) + ' '
          + window.utils.getRandomElementFromArray(SECOND_NAMES),
        coatColor: window.utils.getRandomElementFromArray(COAT_COLORS),
        eyesColor: window.utils.getRandomElementFromArray(EYES_COLORS)
      });
    }

    return wizards;
  };

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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

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

  renderWizards(generateWizardsData(WIZARDS_NUMBER));

})();
