Meteor.methods({
  setInvited: function(opts){
    opts = opts || null;
    if (opts) {
      var boxId = opts.boxId;
      var member = opts.member;

      check(boxId, String);
      check(member._id, String);

      if (boxId == member.boxId) {
        Meteor.users.update(member._id, {$set: {invited: true}});
      }
    }
  }
})