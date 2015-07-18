angular.module('boxify').controller('BoxesDashboardController',
  function($scope, $meteor, currentUser){
    window.scope = $scope;
    window.meteor = $meteor;

    $scope.box = $meteor.object(Boxes, {owner: currentUser._id})
    $scope.$meteorSubscribe('boxes');

    function getTemplate(page){
      return 'client/boxes/dashboard/' + page + '.ng.html';
    }

    $scope.links = [
      {
        title: 'Merchandise',
        template: getTemplate('merchandise')
      },
      {
        title: 'Apparel',
        template: getTemplate('apparel')
      },
      {
        title: 'Members',
        template: getTemplate('members')
      },
      {
        title: 'Settings',
        template: getTemplate('settings')
      }
    ]

    $scope.activeTemplate = $scope.links[0].template;

    $scope.navigateTo = function(template){
      $scope.activeTemplate = template;
    }
  });