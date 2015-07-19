angular.module('boxify').controller('BoxesDashboardMembersController',
  function($scope, $meteor, currentUser, box){
    $scope.members = $meteor.collection(Members, {boxId: box._id});
  });