'use strict';
(function () {
  var COUNT_PIXEL_X = 4;
  var COUNT_PIXEL_Y = 4;
  var CIZE_RECT = 100;
  var GAP = 1;
  var ANGLE_OF_ROTATION = 90;
  var COLOR_BASE = '#90c4b8';
  var COLOR_PAINT = '#00000';

  var shift = CIZE_RECT + GAP;
  var drawingArea = document.querySelector('.drawing-area');
  var buttonReturn = document.querySelector('.controls__button--return');
  var degreeTransform = 0;

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
        rectElement.setAttribute('fill', COLOR_BASE);

        fragment.appendChild(rectElement);

        x = x + shift;
      }
      y = y + shift;
    }
  }

  // меняет цвет квадрата по клику
  function onRectClick(evt) {
    if (evt.target.tagName === 'rect') {
      var colorRect = evt.target.getAttribute('fill');
      var newColor = (colorRect === COLOR_BASE) ? COLOR_PAINT : COLOR_BASE;

      evt.target.setAttribute('fill', newColor);
    }
  }

  // очищает цвет квадратов, и возращает количество пикселей
  function drawingResult() {
    var rects = drawingArea.querySelectorAll('rect');
    var blackPixelsCount = 0;

    for (var i = 0; i < rects.length; i++) {
      var colorRect = rects[i].getAttribute('fill');

      if (colorRect === COLOR_PAINT) {
        blackPixelsCount++;
        rects[i].setAttribute('fill', COLOR_BASE);
      }
    }

    return blackPixelsCount;
  }

  // переворачивает картинку
  function returnDraw(deg) {
    drawingArea.style.transform = 'rotate(' + deg + 'deg)';
  }

  function onButtonReturnClick() {
    // увеличивает угол поворота
    degreeTransform = degreeTransform + ANGLE_OF_ROTATION;
    // повораяивает канвас
    window.canvas.canvasRotate(ANGLE_OF_ROTATION);
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
