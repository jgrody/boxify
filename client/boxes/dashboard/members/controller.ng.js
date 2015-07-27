angular.module('boxify').controller('BoxesDashboardMembersController',
  function($scope, $meteor, box, boxifyDialog){
    $scope.members = $meteor.collection(function(){
      return Meteor.users.find({boxId: box._id});
    }).subscribe('members', box._id)

    $scope.openAddMemberDialog = function(ev){
      return boxifyDialog.show({
        controller: 'DashboardMembersAddController',
        templateUrl: 'client/boxes/dashboard/members/add/template.ng.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {
          box: box
        }
      })
    }
  });