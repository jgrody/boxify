Meteor.methods({
  setInvited: function(boxId, member){
    check(boxId, String);
    check(member._id, String);

    if (boxId == member.boxId) {
      Meteor.users.update(member._id, {$set: {invited: true}});
    }
  }
})