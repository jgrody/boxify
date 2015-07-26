angular.module('boxify').controller('BoxesDashboardMembersController',
  function($scope, $meteor, $timeout, box, boxifyCall){
    window.scope = $scope;
    window.meteor = $meteor;

    $scope.newMember = {};

    $timeout(function(){
      $scope.members = $meteor.collection(function(){
        return Meteor.users.find({boxId: box._id});
      }).subscribe('members', box._id)
    });



    $scope.invite = function(member){
      return boxifyCall('inviteByOwner', {
        boxId: box._id,
        member: member
      }).then(function(){
        return setInvited(member);
      })
    }

    $scope.addMember = function(newMember){
      if (newMember.email && isEmail(newMember.email)) {
        return boxifyCall('createMember', {
          boxId: box._id,
          email: newMember.email,
          password: createToken()
        }).then(function(userId){
          if (!userId.error){
            $scope.invite({_id: userId});
          }
        })
      }
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
  });