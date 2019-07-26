'use strict';

(function () {
  var formMain = document.querySelector('.ad-form');
  var accomodationType = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  var disableInputFields = function () {
    var inputFields = formMain.querySelectorAll('input');
    for (var x = 0; x < inputFields.length; x++) {
      inputFields[x].disabled = true;
    }

    var inputSelect = formMain.querySelectorAll('select');
    for (var y = 0; y < inputSelect.length; y++) {
      inputSelect[y].disabled = true;
    }

    var textField = formMain.querySelector('textarea');
    textField.disabled = true;

    var buttonsBlock = formMain.querySelector('.ad-form__element--submit');

    var button = buttonsBlock.querySelectorAll('button');
    for (var z = 0; z < button.length; z++) {
      button[z].disabled = true;
    }
  };

  disableInputFields();

  var checkInvalidData = function () {
    var inputInValid = formMain.querySelectorAll('input');
    for (var j = 0; j < inputInValid.length; j++) {
      if (!inputInValid[j].valid && inputInValid[j].hasAttribute('required')) {
        inputInValid[j].classList.add('ad-form__element--error');
      }
    }
  };

  var titleInput = formMain.querySelector('#title');
  var priceInput = formMain.querySelector('#price');
  var houseTypeSelect = formMain.querySelector('#type');

  titleInput.addEventListener('keyup', function () {
    if (!titleInput.valid) {
      titleInput.classList.add('ad-form__element--error');
    }
  });

  priceInput.addEventListener('keyup', function () {
    if (!priceInput.valid) {
      priceInput.classList.add('ad-form__element--error');
    }
  });

  titleInput.addEventListener('invalid', function () {
    var validityMessage = '';
    if (titleInput.validity.tooShort) {
      validityMessage = '30 символов - минимальная длина заголовка.';
    } else if (titleInput.validity.tooLong) {
      validityMessage = '100 символов - максимальная длина заголовка.';
    } else if (titleInput.validity.patternMismatch) {
      validityMessage = 'Цифры и специальные символы ограничены к применению.';
    }
    titleInput.setCustomValidity(validityMessage);
  });

  var checkInTime = formMain.querySelector('#timein');
  var checkOutTime = formMain.querySelector('#timeout');

  checkInTime.addEventListener('change', function () {
    checkOutTime.value = checkInTime.value;
  });
  checkOutTime.addEventListener('change', function () {
    checkInTime.value = checkOutTime.value;
  });

  houseTypeSelect.addEventListener('change', function () {
    priceInput.min = accomodationType[houseTypeSelect.value.toUpperCase()];
    priceInput.placeholder = accomodationType[houseTypeSelect.value.toUpperCase()];
  });

  var buttonSubmit = formMain.querySelector('.ad-form__submit');
  buttonSubmit.addEventListener('click', function () {
    checkInvalidData();
  });
})();
