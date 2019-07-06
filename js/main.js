'use strict';
var MIN_Y = 130;
var MAX_Y = 630;
var OFFERS_COUNT = 8;
var PIN_OFFSET_X = -20;
var PIN_OFFSET_Y = -65;

var OFFERS_TYPES = ['palace', 'flat', 'house ', 'bungalo'];

var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

var mapBlock = document.querySelector('.map');

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
  var formMain = document.querySelector('.ad-form');
  formMain.classList.remove('ad-form--disabled');
};

var enableMap = function () {
  mapBlock.classList.remove('map--faded');
};

var enableInput = function () {
  var inputField = document.querySelectorAll('input');
  for (var i = 0; i < inputField.length; i++) {
    inputField[i].disabled = false;
  }
};

var enableSelect = function () {
  var inputSelect = document.querySelectorAll('select');
  for (var i = 0; i < inputSelect.length; i++) {
    inputSelect[i].disabled = false;
  }
};

var enableTextField = function () {
  var textField = document.querySelector('textarea');
  textField.disabled = false;
};

var enableButton = function () {
  var button = document.querySelectorAll('button');
  for (var i = 0; i < button.length; i++) {
    button[i].disabled = false;
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

  var addressField = document.querySelector('#address');
  var bodyRect = document.body.getBoundingClientRect();
  var rect = pinMain.getBoundingClientRect();
  addressField.value = rect.left - bodyRect.left + ', ' + (rect.top - bodyRect.top);
});

// отключение форм ввода

var inputField = document.querySelectorAll('input');
for (var i = 0; i < inputField.length; i++) {
  inputField[i].disabled = true;
}

var inputSelect = document.querySelectorAll('select');
for (var i = 0; i < inputSelect.length; i++) {
  inputSelect[i].disabled = true;
}

var textField = document.querySelector('textarea');
textField.disabled = true;

var buttonsBlock = document.querySelector('.ad-form__element--submit');

var button = buttonsBlock.querySelectorAll('button');
for (var i = 0; i < button.length; i++) {
  button[i].disabled = true;
}
