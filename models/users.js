Meteor.methods({
  setInvited: function(opts){
    opts = opts || null;
    if (!opts) return;

    var boxId = opts.boxId;
    var member = opts.member;

    if (boxId == member.boxId) {
      Meteor.users.update(member._id, {$set: {invited: true}});
    }
  }
})