'use strict';
(function () {
  var drawingArea = document.querySelector('.drawing-area');
  var elapsedMinutes = document.querySelector('.elapsed-time__minutes');
  var elapsedSeconds = document.querySelector('.elapsed-time__seconds');
  var timerId;
  var sec = 0;
  var min = 0;

  // форматирует вид минут или секунд
  function formatsTime(time) {
    return time < 10 ? '0' + time : time;
  }

  // отсчитывает время
  function setTime() {
    sec++;

    if (sec > 59) {
      sec = 0;
      min++;
    }

    // подставляет значение в элементы
    elapsedMinutes.textContent = formatsTime(min);
    elapsedSeconds.textContent = formatsTime(sec);
  }

  // останавливает таймер, вешает обработчик на поле рисования
  function clearTimer() {
    clearInterval(timerId);
    drawingArea.addEventListener('click', onDrawingAreaClick);
    elapsedMinutes.textContent = formatsTime(0);
    elapsedSeconds.textContent = formatsTime(0);
    sec = 0;
    min = 0;
  }

  // запускает таймер, вешает обработчик остановки таймера
  function onDrawingAreaClick() {
    timerId = setInterval(function () {
      setTime();
    }, 1000);

    drawingArea.removeEventListener('click', onDrawingAreaClick);
  }

  drawingArea.addEventListener('click', onDrawingAreaClick);

  window.timer = {
    clearTimer: clearTimer
  };
})();
