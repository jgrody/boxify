angular.module('boxify').factory('flashMessages', [
  '$timeout',
function($timeout){
  var flashService = {
    alerts: [],

    add: function(type, message) {
      flashService.alerts.push({
        type: type,
        message: message,
      })
    },

    remove: function(alert) {
      flashService.alerts.remove(alert);
    },

    addNotice: function(message) {
      flashService.add('info', message);
    },

    addError: function(message){
      flashService.add('danger', message);
    },
  };

  return flashService;
}])
