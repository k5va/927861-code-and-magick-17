'use strict';

var WIZARDS_NUMBER = 4;
var KeyCodes = {
  ESC: 27,
  ENTER: 13
};
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

/**
 * Returns random element of an array
 * @param {Array} elements - array of some elements
 * @return {object} - random element of the given array
 */
var getRandomElementFromArray = function (elements) {
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
      name: getRandomElementFromArray(FIRST_NAMES) + ' ' + getRandomElementFromArray(SECOND_NAMES),
      coatColor: getRandomElementFromArray(COAT_COLORS),
      eyesColor: getRandomElementFromArray(EYES_COLORS)
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

var setupOpenElement = document.querySelector('.setup-open');
var setupOpenIcon = setupOpenElement.querySelector('.setup-open-icon');
var setupElement = document.querySelector('.setup');
var setupCloseElement = setupElement.querySelector('.setup-close');
var setupWizardElement = setupElement.querySelector('.setup-wizard');
var wizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
var wizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
var setupFireballWrapElement = setupElement.querySelector('.setup-fireball-wrap');
var coatColorInput = setupElement.querySelector('input[name=coat-color]');
var eyesColorInput = setupElement.querySelector('input[name=eyes-color]');
var fireballColorInput = setupFireballWrapElement.querySelector('input[name=fireball-color]');

/**
 * Hides setup dialog on Esc pressed handler
 * @param {Event} evt - DOM event object
 */
var onSetupEscPressed = function (evt) {
  // hide setup on Esc pressed, if not username field selected
  if (evt.keyCode === KeyCodes.ESC && !document.activeElement.classList.contains('setup-user-name')) {
    hideSetup();
  }
};

/**
 * Shows setup dialog
 */
var showSetup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPressed);
};

setupOpenElement.addEventListener('click', function () {
  showSetup();
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    showSetup();
  }
});

/**
 * Hides setup dialog
 */
var hideSetup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPressed);
};

setupCloseElement.addEventListener('click', function () {
  hideSetup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    hideSetup();
  }
});

/**
 * Changes wizard's coat color randomly
 */
var changeWizardCoatRandom = function () {
  var randomColor = getRandomElementFromArray(WIZARD_COAT_COLORS);
  wizardCoatElement.style.fill = randomColor;
  coatColorInput.value = randomColor;
};

wizardCoatElement.addEventListener('click', function () {
  changeWizardCoatRandom();
});

/**
 * Changes wizard's eyes color randomly
 */
var changeWizardEyesRandom = function () {
  var randomColor = getRandomElementFromArray(WIZARD_EYES_COLORS);
  wizardEyesElement.style.fill = randomColor;
  eyesColorInput.value = randomColor;
};

wizardEyesElement.addEventListener('click', function () {
  changeWizardEyesRandom();
});

/**
 * Changes color of fireball randomly
 */
var changeFireBallColor = function () {
  var randomColor = getRandomElementFromArray(FIREBALL_COLORS);
  setupFireballWrapElement.style.backgroundColor = randomColor;
  fireballColorInput.value = randomColor;
};

setupFireballWrapElement.addEventListener('click', function () {
  changeFireBallColor();
});
