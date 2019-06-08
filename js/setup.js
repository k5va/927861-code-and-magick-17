'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * Shows setup block
 */
var showSetupBlock = function () {
  var setupBlock = document.querySelector('.setup');
  setupBlock.classList.remove('hidden');
};

/**
 * Returns random element of array
 * @param {Array} elements - array of some elements
 * @return {object} - random element of the given array
 */
var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * (elements.length - 1))];
};

/**
 * Generates wizards' data
 *
 * @return {Array} - wizard objects array
 */
var getWizardsData = function () {
  var wizards = [];

  for (var i = 0; i < FIRST_NAMES.length; i++) {
    wizards.push({
      name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SECOND_NAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    });
  }

  return wizards;
};

showSetupBlock();
var wizards = getWizardsData();

