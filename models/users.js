Meteor.methods({
  setInvited: function(opts){
    opts = opts || null;
    if (!opts) return;

    var boxId = opts.boxId;
    var member = opts.member;

    if (boxId == member.boxId) {
      Meteor.users.update(member._id, {$set: {invited: true}});
    }
  },

  deleteMember: function(opts){
    opts = opts || null;
    if (!opts) return;

    var member = opts.member;
    var box = Boxes.findOne(member.boxId);

    if (!box) {
      throw new Meteor.Error(404, "Couldn't find the box associated with this user");
    }

    if (box.ownerId !== this.userId) {
      throw new Meteor.Error(404, "Couldn't find the box associated with this user");
    }

    if (member._id !== box.ownerId && _.contains(box.members, member._id)) {
      Meteor.users.remove(member._id);
      Boxes.update(box._id, {$pull: {members: member._id}});
    }
  }
})