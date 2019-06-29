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
      onLoad(xhr.response);
    });
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
