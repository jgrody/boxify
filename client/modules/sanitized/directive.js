angular.module('boxify').directive('sanitized', function(){
  return {
    templateUrl: 'client/modules/sanitized/template.ng.html',
    scope: { sanitized: '=' },
    controller: ["$scope", "$sce", function($scope, $sce) {
      $scope.html = $sce.trustAsHtml($scope.sanitized);
    }]
  };

})