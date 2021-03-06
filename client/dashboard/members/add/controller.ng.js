angular.module('boxify').controller('DashboardMembersAddController',
function($scope, box, boxifyCall, $mdDialog, toast){
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
    if (newMember.email && !isEmail(newMember.email).error) {
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
      .then($scope.close)
      .then(function(){
        toast({
          type: "success",
          title: "User added.",
          message: "The user will get an email with further instructions to verify their account."
        })
      })
    }
  }

  $scope.submitDisabled = function(){
    return !$scope.newMember.email;
  }
  
  function createToken(){
    var rand = function() {
      return Math.random().toString(36).substr(2);
    };

    return rand();
  }

  function setInvited(member){
    return boxifyCall('setInvited', {
      boxId: box._id,
      member: member
    })
  }
})