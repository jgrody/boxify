angular.module('boxify').factory('flashErrors', [
  'flashMessages',
function(flashMessages){
  return function(error) {
    if (error.reason) {
      flashMessages.addError(error.reason);
    } else {
      flashMessages.addError("Oops! A server error has occurred. Sorry.");
    }
  };
}])
