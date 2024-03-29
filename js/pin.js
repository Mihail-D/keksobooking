'use strict';

(function () {
  var OFFERS_COUNT = 8;
  var PIN_OFFSET_Y = -75;
  var OFFERS_TYPES = ['palace', 'flat', 'house ', 'bungalo'];
  var mapWidth = document.querySelector('.map__pins').offsetWidth;
  var getRandomNumber = function (minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  };

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
        y: getRandomNumber(window.form.MIN_Y, window.form.MAX_Y),
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
    pinElement.style.left = pin.location.x + window.form.PIN_OFFSET_X + 'px';
    pinElement.style.top = pin.location.y + PIN_OFFSET_Y + 'px';

    var avatar = pinElement.querySelector('img');
    avatar.src = pin.author.avatar;
    avatar.alt = 'Personal Avatar';
    return pinElement;
  };

  for (var i = 0; i < pins.length; i++) {
    window.form.pinFragment.appendChild(createPin(pins[i]));
  }
})();
