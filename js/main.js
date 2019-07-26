'use strict';

var MIN_Y = 130;
var MAX_Y = 630;
var OFFERS_COUNT = 8;
var PIN_OFFSET_X = -61;
var PIN_OFFSET_Y = -75;

var OFFERS_TYPES = ['palace', 'flat', 'house ', 'bungalo'];

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
    inputFields[j].disabled = false;
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

var pinMain = document.querySelector('.map__pin--main');

var getPageElements = function () {
  enableMap();
  enableForm();
  enableInput();
  enableSelect();
  enableTextField();
  enableButton();

  var addressField = formMain.querySelector('#address');

  var mapRect = mapBlock.getBoundingClientRect();
  var pinRect = pinMain.getBoundingClientRect();
  addressField.value = pinRect.left - mapRect.left + ', ' + (pinRect.top - mapRect.top);

  mapBlock.appendChild(pinFragment);
};

// обработчик на метку по mousedown

(function () {
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (pinMain.offsetTop - shift.y < MIN_Y) {
        pinMain.style.top = MIN_Y + 'px';
      } else if (pinMain.offsetTop - shift.y > MAX_Y) {
        pinMain.style.top = MAX_Y + 'px';
      } else {
        pinMain.style.top = pinMain.offsetTop - shift.y + 'px';
      }

      if (pinMain.offsetLeft - shift.x < 0) {
        pinMain.style.left = 0 + 'px';
      } else if (pinMain.offsetLeft - shift.x > mapWidth + PIN_OFFSET_X) {
        pinMain.style.left = mapWidth + PIN_OFFSET_X + 'px';
      } else {
        pinMain.style.left = pinMain.offsetLeft - shift.x + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getPageElements();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault);
        };
        pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
