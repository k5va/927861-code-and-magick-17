'use strict';

var WIZARDS_NUMBER = 4;
var KEY_CODES = {
  ESC: 27,
  ENTER: 13
};

/**
 * Shows block
 * @param {string} blockSelector - selector for the block to show
 */
var showBlock = function (blockSelector) {
  var block = document.querySelector(blockSelector);
  block.classList.remove('hidden');
};

/**
 * Returns random element of an array
 * @param {Array} elements - array of some elements
 * @return {object} - random element of the given array
 */
var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

/**
 * Generates wizards' data
 * @param {number} wizardsNumber - number of wizards to generate
 * @return {Array} - wizard objects array
 */
var generateWizardsData = function (wizardsNumber) {
  // create mock data
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  // initialize wizards data array
  var wizards = [];
  // populate wizards with data
  for (var i = 0; i < wizardsNumber; i++) {
    wizards.push({
      name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SECOND_NAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
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

showBlock('.setup');
renderWizards(generateWizardsData(WIZARDS_NUMBER));
showBlock('.setup-similar');

var setupOpenElement = document.querySelector('.setup-open');
var setupOpenIcon = setupOpenElement.querySelector('.setup-open-icon');
var setupElement = document.querySelector('.setup');
var setupCloseElement = setupElement.querySelector('.setup-close');

// show setup
var showSetup = function () {
  setupElement.classList.remove('hidden');
};

setupOpenElement.addEventListener('click', function () {
  showSetup();
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODES.ENTER) {
    showSetup();
  }
});


// hide setup
var hideSetup = function () {
  setupElement.classList.add('hidden');
};

setupCloseElement.addEventListener('click', function () {
  hideSetup();
});
