angular.module('boxify').controller('FlashController', [
  '$scope',
  '$meteor',
  'flashMessages',
function($scope, $meteor, flashMessages){
  $scope.alerts = flashMessages.alerts;
  $scope.close = flashMessages.remove;
}]);
