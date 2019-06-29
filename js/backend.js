'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/code-and-magick/data';

  /**
   * Loads wizards data from remote server
   * @param {function} onLoad - called when data is successfully loaded
   * @param {function} onError - called on error
   */
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка при загрузке похожих волшебников. Статус ответа: '
          + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка при загрузке похожих волшебников. Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Ошибка при загрузке похожих волшебников. Запрос не успел выполниться за '
        + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
