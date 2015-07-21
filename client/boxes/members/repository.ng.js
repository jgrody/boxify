angular.module('boxify').factory('membersRepository',
  function(boxifyCall){
    return {
      invite: function(boxId, member, token){
        return boxifyCall('invite', {
          boxId: boxId,
          member: member,
          token: token
        });
      },

      setInvited: function(boxId, member){
        return boxifyCall('setInvited', {
          boxId: boxId,
          member: member
        });
      }
    }
  });