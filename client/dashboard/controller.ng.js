angular.module('boxify').controller('BoxesDashboardController',
  function($scope, $meteor, box){
    $scope.box = box;

    $scope.links = [
      {
        title: 'Members',
        sref: 'root.dashboard.members'
      },
      {
        title: 'Pricing',
        sref: 'root.dashboard.pricing'
      },
      {
        title: 'Settings',
        sref: 'root.dashboard.settings'
      }
    ]
  });