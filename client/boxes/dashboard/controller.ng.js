angular.module('boxify').controller('BoxesDashboardController',
  function($scope, $meteor, currentUser, box){
    $scope.box = box;

    function getTemplate(page){
      return 'client/boxes/dashboard/' + page + '.ng.html';
    }

    $scope.links = [
      {
        title: 'Merchandise',
        template: getTemplate('merchandise'),
        active: false
      },
      {
        title: 'Apparel',
        template: getTemplate('apparel'),
        active: false
      },
      {
        title: 'Members',
        template: getTemplate('members'),
        active: true
      },
      {
        title: 'Settings',
        template: getTemplate('settings'),
        active: false
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