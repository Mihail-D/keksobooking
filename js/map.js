'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var mapWidth = document.querySelector('.map__pins').offsetWidth;
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

      if (pinMain.offsetTop - shift.y < window.form.MIN_Y) {
        pinMain.style.top = window.form.MIN_Y + 'px';
      } else if (pinMain.offsetTop - shift.y > window.form.MAX_Y) {
        pinMain.style.top = window.form.MAX_Y + 'px';
      } else {
        pinMain.style.top = pinMain.offsetTop - shift.y + 'px';
      }

      if (pinMain.offsetLeft - shift.x < 0) {
        pinMain.style.left = 0 + 'px';
      } else if (pinMain.offsetLeft - shift.x > mapWidth + window.form.PIN_OFFSET_X) {
        pinMain.style.left = mapWidth + window.form.PIN_OFFSET_X + 'px';
      } else {
        pinMain.style.left = pinMain.offsetLeft - shift.x + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.getPageElements();
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
