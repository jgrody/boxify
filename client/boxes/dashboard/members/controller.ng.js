angular.module('boxify').controller('BoxesDashboardMembersController',
  function($scope, $meteor, $timeout, box, membersRepository){
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
      return membersRepository.invite(box._id, member, createToken())
        .then(setInvited(member))
        .catch(function(err){
          console.log('err: ', err);
        })
    }

    function setInvited(member){
      return membersRepository.setInvited(box._id, member)
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
  });