'use strict';
(function () {
  var COUNT_PIXEL_X = 4;
  var COUNT_PIXEL_Y = 4;
  var ANGLE_OF_ROTATION = 90;

  var drawingArea = document.querySelector('.drawing-area');
  var buttonReturn = document.querySelector('.controls__button--return');
  var degreeTransform = 0;

  // создает фрагмент
  var fragment = document.createDocumentFragment();

  // добавляет квадраты во фрагмент в нужном количестве
  function drawRect() {
    var rectCount = COUNT_PIXEL_X * COUNT_PIXEL_Y;

    for (var i = 0; i < rectCount; i++) {
      var rectElement = document.createElement('div');
      rectElement.classList.add('pixel-blue');

      fragment.appendChild(rectElement);
    }
  }

  // меняет цвет квадрата по клику
  function onRectClick(evt) {
    if (evt.target.classList.contains('pixel-blue')) {
      evt.target.classList.toggle('pixel-black');
    }
  }

  // очищает цвет квадратов, и возращает количество пикселей
  function drawingResult() {
    var rects = drawingArea.querySelectorAll('div');
    var blackPixelsCount = 0;

    for (var i = 0; i < rects.length; i++) {
      if (rects[i].contain('pixel-black')) {
        blackPixelsCount++;
        rects[i].classList.remove('pixel-black');
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
    // поворачивает канвас
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
