'use strict';
(function () {
  var COUNT_PIXEL_X = 4;
  var COUNT_PIXEL_Y = 4;
  var CIZE_RECT = 100;
  var GAP = 1;
  var ANGLE_OF_ROTATION = 90;

  var shift = CIZE_RECT + GAP;
  var drawingArea = document.querySelector('.drawing-area');
  var buttonReturn = document.querySelector('.controls__button--return');
  var degreeTransform = 0;

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
  function onRectClick(evt) {
    if (evt.target.tagName === 'rect') {
      evt.target.classList.toggle('pixel-black');
    }
  }

  // очищает цвет квадратов, и возращает количество пикселей
  function drawingResult() {
    var rects = drawingArea.children;
    var blackPixelsCount = 0;
    [].forEach.call(rects, function (rect) {
      if (rect.classList.contains('pixel-black')) {
        blackPixelsCount++;
        rect.classList.remove('pixel-black');
      }
    });
    return blackPixelsCount;
  }

  // переворачивает картинку
  function returnDraw(deg) {
    drawingArea.style.transform = 'rotate(' + deg +'deg)';
  }

  function onButtonReturnClick() {
    degreeTransform = degreeTransform + ANGLE_OF_ROTATION;
    if (degreeTransform === 360) {
      degreeTransform = 0;
    }
    returnDraw(degreeTransform);
  }

  drawRect();

  // добавляет фрагмент в тег svg
  drawingArea.appendChild(fragment);

  drawingArea.addEventListener('click', onRectClick);

  buttonReturn.addEventListener('click', onButtonReturnClick);

  window.draw = {
    drawingResult: drawingResult
  };
})();
