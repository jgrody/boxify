angular.module('boxify').controller('BoxesNewController',
  function($rootScope, $scope, $meteor){
    window.scope = $scope;

    $scope.boxes = $meteor.collection(Boxes);
    $scope.$meteorSubscribe('boxes');

    $scope.newBox = {};

    $scope.save = function(){
      $scope.newBox.ownerId = $rootScope.currentUser._id;
      $scope.promise = $scope.boxes.save($scope.newBox);
      $scope.newBox = {};
    }
  });