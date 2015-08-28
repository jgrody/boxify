angular.module('boxify').controller('BoxesDashboardMembersController',
function($scope, $meteor, box, boxifyCall, boxifyDialog, toast){

  $scope.members = $meteor.collection(function(){
    return Meteor.users.find({boxId: box._id});
  }).subscribe('members', box._id)

  $scope.openAddMemberDialog = function(ev){
    return boxifyDialog.show({
      controller: 'DashboardMembersAddController',
      templateUrl: 'client/dashboard/members/add/template.ng.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        box: box
      }
    })
  }

  $scope.createConfirm = function($event){
    return boxifyDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are you sure you want to delete this member?')
      .ariaLabel('Delete member')
      .ok('Yes')
      .cancel('Cancel')
      .targetEvent($event);
  }

  $scope.deleteUser = function($event, member){
    var confirm = $scope.createConfirm($event);

    boxifyDialog.show(confirm).then(function(){
      return deleteUser(member);
    })
  }

  function deleteUser(member){
    return boxifyCall('deleteMember', { member: member })
      .then(function(){
        toast({
          type: "success",
          title: "User deleted."
        })
      });
  }
});