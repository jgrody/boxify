angular.module('boxify').controller('BoxesDashboardController',
function($scope, $state, $meteor, $mdSidenav, box){
  window.scope = $scope;
    $scope.box = box;

    $scope.links = [
      {
        title: 'Members',
        sref: 'root.dashboard.members',
        icon: 'social:ic_people_24px'
      },
      {
        title: 'Pricing',
        sref: 'root.dashboard.pricing',
        icon: 'editor:ic_attach_money_24px'
      },
      {
        title: 'Settings',
        sref: 'root.dashboard.settings',
        icon: 'action:ic_settings_24px'
      }
    ]

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.navigateTo = function(sref){
      $state.go(sref);
    }

});