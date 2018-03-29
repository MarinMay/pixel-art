'use strict';
(function () {
  var outputPixels = document.querySelector('.output-result__pixels');
  var outputTime = document.querySelector('.output-result__time');
  var buttonResult = document.querySelector('.controls__button--result');
  var elapsedTime = document.querySelector('.elapsed-time__time');

  function onButtonResultClick() {
    outputTime.textContent = elapsedTime.textContent;
    window.timer.clearTimer();
    window.canvas.drawDivInCanvas();
    outputPixels.textContent = window.draw.drawingResult();
  }

  buttonResult.addEventListener('click', onButtonResultClick);
})();
