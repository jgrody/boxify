angular.module('boxify').controller('BoxesDashboardController',
  function($scope, $meteor, box){
    $scope.box = box;

    $scope.links = [
      {
        title: 'Members',
        sref: 'root.dashboard.members'
      },
      {
        title: 'Settings',
        sref: 'root.dashboard.settings'
      }
    ]
  });