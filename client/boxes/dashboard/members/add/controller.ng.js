angular.module('boxify')
.controller('DashboardMembersAddController',
function($scope, box, boxifyCall, $mdDialog){
  window.scope = $scope;

  $scope.newMember = {};
  $scope.close = $mdDialog.hide;

  $scope.invite = function(member){
    return boxifyCall('inviteByOwner', {
      boxId: box._id,
      member: member
    }).then(function(){
      return setInvited(member);
    })
  }

  $scope.add = function(newMember){
    if (newMember.email && isEmail(newMember.email)) {
      return boxifyCall('createMember', {
        boxId: box._id,
        email: newMember.email,
        password: createToken(),
        profile: {
          firstName: newMember.firstName,
          lastName: newMember.lastName
        }
      }).then(function(userId){
        if (!userId.error){
          $scope.invite({_id: userId});
        }
      })
    }
  }

  $scope.submitDisabled = function(){
    return !$scope.newMember.firstName ||
      !$scope.newMember.lastName ||
      !$scope.newMember.email
  }
  
  function createToken(){
    var rand = function() {
      return Math.random().toString(36).substr(2);
    };

    var token = function() {
      return rand() + rand();
    };

    return token();
  }

  function setInvited(member){
    return boxifyCall('setInvited', {
      boxId: box._id,
      member: member
    })
  }
})