'use strict';

(function () {
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
  var setupElementInitialPosition = {};

  /**
   * Moves given element to specifeed X, Y position.
   * @param {HTMLElement} element - HTMlElement object to be moved
   * @param {*} x - x coordinate
   * @param {*} y - y coordinate
   */
  var moveElementToPosition = function (element, x, y) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  };

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
    setupElementInitialPosition = {
      x: setupElement.offsetLeft,
      y: setupElement.offsetTop
    };
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
    moveElementToPosition(setupElement, setupElementInitialPosition.x, setupElementInitialPosition.y);
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
    var randomColor = window.utils.getRandomElementFromArray(WIZARD_COAT_COLORS);
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
    var randomColor = window.utils.getRandomElementFromArray(WIZARD_EYES_COLORS);
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
    var randomColor = window.utils.getRandomElementFromArray(FIREBALL_COLORS);
    setupFireballWrapElement.style.backgroundColor = randomColor;
    fireballColorInput.value = randomColor;
  };

  setupFireballWrapElement.addEventListener('click', function () {
    changeFireBallColor();
  });

  var uploadElement = setupElement.querySelector('.upload');
  uploadElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var isDragged = false;
    var setupElementCurrentPosition = {
      x: setupElement.offsetLeft,
      y: setupElement.offsetTop
    };
    /**
     * Mouse move handler for upload element
     * @param {MouseEvent} moveEvt - Mouse event DOM object
     */
    var onUploadMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      isDragged = true;
      var shift = {
        x: moveEvt.clientX - evt.clientX,
        y: moveEvt.clientY - evt.clientY,
      };

      moveElementToPosition(setupElement,
          setupElementCurrentPosition.x + shift.x,
          setupElementCurrentPosition.y + shift.y);
    };
    document.addEventListener('mousemove', onUploadMouseMove);

    /**
     * Mouse Up handler for upload element
     * @param {MouseEvent} upEvt - Mouse event DOM object
     */
    var onUploadMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          uploadElement.removeEventListener('click', onClickPreventDefault);
        };
        uploadElement.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onUploadMouseMove);
      document.removeEventListener('mouseup', onUploadMouseUp);
    };
    document.addEventListener('mouseup', onUploadMouseUp);
  });
})();
