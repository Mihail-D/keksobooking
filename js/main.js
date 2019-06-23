'use strict';
var MIN_Y = 130;
var MAX_Y = 630;
var ARRAY_LENGTH = 8;
var PIN_OFFSET_X = -20;
var PIN_OFFSET_Y = -65;

var PROPERTY_TYPES = ['palace', 'flat', 'house ', 'bungalo'];

var getRandomCoordinates = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var getImages = function () {
  var avatarsArray = [];
  for (var i = 1; i <= ARRAY_LENGTH; i++) {
    var avatarsArrayIndex = i;
    avatarsArray.push('img/avatars/user0' + avatarsArrayIndex + '.png');
  }
  return avatarsArray;
};

var avatars = getImages();

var mapWidth = document.querySelector('.map__pins').offsetWidth;

var getOffers = function (value) {
  var typeIndex;
  if (typeIndex >= PROPERTY_TYPES.length) {
    typeIndex = value - PROPERTY_TYPES.length;
  } else {
    typeIndex = value;
  }
  return {
    author: {avatar: avatars[value]},
    offer: {type: PROPERTY_TYPES[typeIndex]},
    location: {x: getRandomCoordinates(0, mapWidth), y: getRandomCoordinates(MIN_Y, MAX_Y)},
  };
};

var getOffersArray = function () {
  var offersArray = [];
  for (var i = 0; i < ARRAY_LENGTH; i++) {
    offersArray.push(getOffers(i));
  }
  return offersArray;
};

var pins = getOffersArray();

var pinTemporary = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (pin) {
  var pinBlock = pinTemporary.cloneNode(true);
  pinBlock.style.left = pin.location.x + PIN_OFFSET_X + 'px';
  pinBlock.style.top = pin.location.y + PIN_OFFSET_Y + 'px';
  var avatar = pinBlock.querySelector('img');
  avatar.src = pin.author.avatar;
  avatar.alt = 'Personal Avatar';
  return pinBlock;
};

var pinFinished = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  pinFinished.appendChild(createPin(pins[i]));
}

mapBlock.appendChild(pinFinished);
