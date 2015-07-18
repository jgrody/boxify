angular.module('boxify').controller('BoxesDashboardController',
  function($scope, $meteor, currentUser){
    window.scope = $scope;
    window.meteor = $meteor;

    $scope.box = $meteor.object(Boxes, {ownerId: currentUser._id})
    $scope.members = $meteor.collection(Members, {boxId: $scope.box._id});

    $scope.$meteorSubscribe('boxes');
    $scope.$meteorSubscribe('members');

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