'use strict';

(function () {
  window.pinMain.addEventListener('mousedown', function (evt) {
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

      if (window.pinMain.offsetTop - shift.y < window.MIN_Y) {
        window.pinMain.style.top = window.MIN_Y + 'px';
      } else if (window.pinMain.offsetTop - shift.y > window.MAX_Y) {
        window.pinMain.style.top = window.MAX_Y + 'px';
      } else {
        window.pinMain.style.top = window.pinMain.offsetTop - shift.y + 'px';
      }

      if (window.pinMain.offsetLeft - shift.x < 0) {
        window.pinMain.style.left = 0 + 'px';
      } else if (window.pinMain.offsetLeft - shift.x > window.mapWidth + window.PIN_OFFSET_X) {
        window.pinMain.style.left = window.mapWidth + window.PIN_OFFSET_X + 'px';
      } else {
        window.pinMain.style.left = window.pinMain.offsetLeft - shift.x + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.getPageElements();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          window.pinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
