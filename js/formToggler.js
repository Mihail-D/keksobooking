'use strict';

(function () {
  window.MIN_Y = 130;
  window.PIN_OFFSET_X = -61;
  window.MAX_Y = 630;
  window.formMain = document.querySelector('.ad-form');
  window.mapWidth = document.querySelector('.map__pins').offsetWidth;
  window.mapBlock = document.querySelector('.map');
  window.pinFragment = document.createDocumentFragment();

  var enableForm = function () {
    window.formMain.classList.remove('ad-form--disabled');
  };

  var enableMap = function () {
    window.mapBlock.classList.remove('map--faded');
  };

  var enableInput = function () {
    var inputFields = window.formMain.querySelectorAll('input');
    for (var j = 0; j < inputFields.length; j++) {
      inputFields[j].disabled = false;
    }
  };

  var enableSelect = function () {
    var inputSelect = window.formMain.querySelectorAll('select');
    for (var k = 0; k < inputSelect.length; k++) {
      inputSelect[k].disabled = false;
    }
  };

  var enableTextField = function () {
    var textField = window.formMain.querySelector('textarea');
    textField.disabled = false;
  };

  var enableButton = function () {
    var button = window.formMain.querySelectorAll('button');
    for (var l = 0; l < button.length; l++) {
      button[l].disabled = false;
    }
  };

  window.pinMain = document.querySelector('.map__pin--main');

  window.getPageElements = function () {
    enableMap();
    enableForm();
    enableInput();
    enableSelect();
    enableTextField();
    enableButton();

    var addressField = window.formMain.querySelector('#address');

    var mapRect = window.mapBlock.getBoundingClientRect();
    var pinRect = window.pinMain.getBoundingClientRect();
    addressField.value = pinRect.left - mapRect.left + ', ' + (pinRect.top - mapRect.top);

    window.mapBlock.appendChild(window.pinFragment);
  };

  var disableInputFields = function () {
    var inputFields = window.formMain.querySelectorAll('input');
    for (var x = 0; x < inputFields.length; x++) {
      inputFields[x].disabled = true;
    }

    var inputSelect = window.formMain.querySelectorAll('select');
    for (var y = 0; y < inputSelect.length; y++) {
      inputSelect[y].disabled = true;
    }

    var textField = window.formMain.querySelector('textarea');
    textField.disabled = true;

    var buttonsBlock = window.formMain.querySelector('.ad-form__element--submit');

    var button = buttonsBlock.querySelectorAll('button');
    for (var z = 0; z < button.length; z++) {
      button[z].disabled = true;
    }
  };

  disableInputFields();
})();
