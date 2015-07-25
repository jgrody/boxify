angular.module('boxify').controller('BoxesDashboardMembersController',
  function($scope, $meteor, $timeout, box, boxifyCall){
    window.scope = $scope;
    window.meteor = $meteor;

    $timeout(function(){
      $scope.members = $meteor
        .collection(Meteor.users, false)
        .subscribe('members')
        .filter(function(member){
          return member.boxId == box._id;
        })
    })

    $scope.invite = function(member){
      return boxifyCall('inviteByOwner', {
        boxId: box._id,
        member: member
      })
      .then(setInvited(member))
      .catch(function(err){
        console.log('err: ', err);
      })
    }

    function setInvited(member){
      return boxifyCall('setInvited', {
        boxId: box._id,
        member: member
      })
    }
  });