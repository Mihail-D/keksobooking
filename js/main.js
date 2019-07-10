'use strict';
var MIN_Y = 130;
var MAX_Y = 630;
var OFFERS_COUNT = 8;
var PIN_OFFSET_X = -20;
var PIN_OFFSET_Y = -65;

var OFFERS_TYPES = ['palace', 'flat', 'house ', 'bungalo'];
var accomodationType = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

var mapBlock = document.querySelector('.map');
var formMain = document.querySelector('.ad-form');
var mapWidth = document.querySelector('.map__pins').offsetWidth;

var getOffers = function (index) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png',
    },
    offer: {
      type: OFFERS_TYPES[getRandomNumber(0, OFFERS_TYPES.length)],
    },
    location: {
      x: getRandomNumber(0, mapWidth),
      y: getRandomNumber(MIN_Y, MAX_Y),
    },
  };
};

var getOffersArray = function () {
  var offersArray = [];
  for (var i = 0; i < OFFERS_COUNT; i++) {
    offersArray.push(getOffers(i));
  }
  return offersArray;
};

var pins = getOffersArray();

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + PIN_OFFSET_X + 'px';
  pinElement.style.top = pin.location.y + PIN_OFFSET_Y + 'px';

  var avatar = pinElement.querySelector('img');
  avatar.src = pin.author.avatar;
  avatar.alt = 'Personal Avatar';
  return pinElement;
};

var pinFragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  pinFragment.appendChild(createPin(pins[i]));
}

var enableForm = function () {
  formMain.classList.remove('ad-form--disabled');
};

var enableMap = function () {
  mapBlock.classList.remove('map--faded');
};

var enableInput = function () {
  var inputFields = formMain.querySelectorAll('input');
  for (var j = 0; j < inputFields.length; j++) {
    if (inputFields[j].name !== 'address') {
      inputFields[j].disabled = false;
    }
  }
};

var enableSelect = function () {
  var inputSelect = formMain.querySelectorAll('select');
  for (var k = 0; k < inputSelect.length; k++) {
    inputSelect[k].disabled = false;
  }
};

var enableTextField = function () {
  var textField = formMain.querySelector('textarea');
  textField.disabled = false;
};

var enableButton = function () {
  var button = formMain.querySelectorAll('button');
  for (var l = 0; l < button.length; l++) {
    button[l].disabled = false;
  }
};

// обработчик на метку по click
var pinMain = document.querySelector('.map__pin--main');
pinMain.addEventListener('click', function () {
  enableMap();
  enableForm();
  enableInput();
  enableSelect();
  enableTextField();
  enableButton();

  mapBlock.appendChild(pinFragment);
});

// обработчик на метку по mousedown

pinMain.addEventListener('mousedown', function () {
  enableForm();
  enableMap();
  enableInput();
  enableSelect();
  enableTextField();
  enableButton();

  var addressField = formMain.querySelector('#address');

  var mapRect = mapBlock.getBoundingClientRect();
  var pinRect = pinMain.getBoundingClientRect();
  addressField.value = pinRect.left - mapRect.left + ', ' + (pinRect.top - mapRect.top);
});

// отключение форм ввода

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

// Валидация форм
var checkInvalidData = function () {
  var inputInValid = formMain.querySelectorAll('input');
  for (var j = 0; j < inputInValid.length; j++) {
    if (!inputInValid[j].valid && inputInValid[j].hasAttribute('required')) {
      inputInValid[j].style.backgroundColor = '#ffe9ec';
    }
  }
};

var titleInput = formMain.querySelector('#title');
var priceInput = formMain.querySelector('#price');
var houseTypeSelect = formMain.querySelector('#type');

titleInput.addEventListener('invalid', function () {
  var validityMessage = '';
  if (titleInput.validity.tooShort) {
    validityMessage = '30 символов - минимальная длина заголовка.';
  } else if (titleInput.validity.tooLong) {
    validityMessage = '100 символов - максимальная длина заголовка.';
  } else if (titleInput.validity.patternMismatch) {
    validityMessage = 'Только латинские и кириллические символы  допустимы для заголовка.';
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
