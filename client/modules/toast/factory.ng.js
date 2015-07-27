"use macros";

var DEFAULT_DELAY = 3000;

angular.module('boxify')
.controller('toastController', function($scope, toastClass, title, message, actionLabel, action, dismiss){
  $scope.toastClass = toastClass;
  $scope.title = title;
  $scope.message = message;
  $scope.actionLabel = actionLabel;
  $scope.dismiss = dismiss;

  $scope.hasAction = function() {
    return actionLabel && action;
  };

  $scope.action = function() {
    dismiss().then(action);
  };
})
.factory('toast', function($mdToast, $animate){
  function getToastClass(type) {
    switch (type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      default:
        return 'toast-info';
    }
  }

  function getHideDelay(delay) {
    if (Object.isBoolean(delay)) {
      return delay ? DEFAULT_DELAY : false;
    } else {
      return delay || DEFAULT_DELAY;
    }
  }

  function getLocals(options) {
    return {
      toastClass: getToastClass(options.type),
      title: options.title,
      message: options.message,
      actionLabel: options.actionLabel,
      action: options.action,
      dismiss: $mdToast.hide
    };
  }

  return function(options) {
    return $mdToast.show($mdToast.simple({
      templateUrl: 'client/modules/toast/template.ng.html',
      controller: 'toastController',
      locals: getLocals(options),
      hideDelay: getHideDelay(options.delay)
    }));
  };
})

