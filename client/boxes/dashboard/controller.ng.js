angular.module('boxify').controller('BoxesDashboardController',
  function($scope, $meteor, currentUser, box){
    $scope.box = box;

    function getTemplate(page){
      return 'client/boxes/dashboard/' + page + '.ng.html';
    }

    $scope.links = [
      {
        title: 'Members',
        template: getTemplate('members'),
        active: true,
        sref: 'root.dashboard.members'
      },
      {
        title: 'Settings',
        template: getTemplate('settings'),
        active: false,
        sref: 'root.dashboard.settings'
      }
    ]

    $scope.activeTemplate = $scope.links.find({active: true}).template;

    function deactivate(link){
      link.active = false;
    }

    $scope.navigateTo = function(link){
      $scope.links.each(deactivate)
      link.active = true;
      $scope.activeTemplate = link.template;
    }
  });