(function () {

  'use strict';

  module.exports = function () {

    this.Before(function (callback) {
      // this.server.call('addUser', {email: "bob@example.com"}).then(callback);
      callback();
    });

  };

})();