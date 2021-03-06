'use strict';
(function () {
  var CANVAS_WIDTH = 100;
  var CANVAS_HEIGHT = 100;

  var canvas = document.querySelector('.canvas-output');
  var ctx = canvas.getContext('2d');

  // поворачивает канвас
  function canvasRotate(deg) {
    ctx.rotate(degInRad(deg));
  }

  // переводи градус в радиан
  function degInRad(deg) {
    return deg * Math.PI / 180;
  }

  // переносит результат на канвас
  function drawCanvasResult() {
    var img = new Image();
    // находит SVG
    var svgCanvasSource = document.querySelector('.drawing-area');
    // копирует его
    var svgContent = svgCanvasSource.cloneNode('true');
    // удаляет трансформацию - иначе не рисует его на канвасе
    svgContent.removeAttribute('style');

    // очищает холст
    ctx.clearRect(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);

    // рисует svg на канвасе
    img.onload = function () {
      ctx.drawImage(img, -CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    // добавляет источник картинки из svg в канвас
    img.src = 'data:image/svg+xml;base64,' + btoa(svgContent.outerHTML);

    // добавляет анимацию
    canvas.classList.add('canvas-output-animation');
  }

  // удаляет класс анимации по завершению
  function onAnimationEnd() {
    canvas.classList.remove('canvas-output-animation');
  }

  // сдвигает точку поворота для вращения
  ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

  canvas.addEventListener('animationend', onAnimationEnd, false);

  window.canvas = {
    drawCanvasResult: drawCanvasResult,
    canvasRotate: canvasRotate
  };
})();
