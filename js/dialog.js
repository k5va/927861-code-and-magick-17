'use strict';

(function () {
  var dependencies = {
    utils: window.utils
  };

  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
    'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
    if (evt.keyCode === KeyCodes.ESC && !evt.target.classList.contains('setup-user-name')) {
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
    var randomColor = dependencies.utils.getRandomElementFromArray(WIZARD_COAT_COLORS);
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
    var randomColor = dependencies.utils.getRandomElementFromArray(WIZARD_EYES_COLORS);
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
    var randomColor = dependencies.utils.getRandomElementFromArray(FIREBALL_COLORS);
    setupFireballWrapElement.style.backgroundColor = randomColor;
    fireballColorInput.value = randomColor;
  };

  setupFireballWrapElement.addEventListener('click', function () {
    changeFireBallColor();
  });
})();
