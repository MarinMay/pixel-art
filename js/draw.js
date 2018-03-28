'use strict';
(function () {
  var COUNT_PIXEL_X = 4;
  var COUNT_PIXEL_Y = 4;
  var CIZE_RECT = 100;
  var GAP = 1;

  var shift = CIZE_RECT + GAP;
  var drawingArea = document.querySelector('.drawing-area');
  var canvas = document.querySelector('.canvas-output');
  var ctx = canvas.getContext("2d");

  // создает фрагмент
  var fragment = document.createDocumentFragment();

  // добавляет квадраты во фрагмент в нужном количестве
  function drawRect() {
    var y = 0;

    for (var j = 0; j < COUNT_PIXEL_Y; j++) {
      var x = 0;

      for (var i = 0; i < COUNT_PIXEL_X; i++) {
        var rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectElement.setAttribute('width', CIZE_RECT);
        rectElement.setAttribute('height', CIZE_RECT);
        rectElement.setAttribute('x', x);
        rectElement.setAttribute('y', y);
        rectElement.classList.add('pixel-blue');

        fragment.appendChild(rectElement);

        x = x + shift;
      }
      y = y + shift;
    }
  }

  // меняет цвет квадрата по клику
  function toggleColor(evt) {
    if (evt.target.tagName === 'rect') {
      evt.target.classList.toggle('pixel-black');
    }
  }

  drawRect();

  // добавляет фрагмент в тег svg
  drawingArea.appendChild(fragment);

  drawingArea.addEventListener('click', toggleColor);
})();
