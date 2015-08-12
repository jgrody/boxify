Boxes = new Mongo.Collection("boxes");

Boxes.allow({
  insert: function (userId, box) {
    return userId && box.ownerId === userId;
  },
  update: function (userId, box, fields, modifier) {
    return userId && box.ownerId === userId;
  },
  remove: function (userId, box) {
    return userId && box.ownerId === userId;
  }
});

Meteor.methods({
  inviteByOwner: function (opts) {
    opts = opts || null;
    if (!opts) return;

    var boxId = opts.boxId;
    var member = opts.member;

    var box = Boxes.findOne(boxId);

    if (!box) { throw new Meteor.Error(404, "No such box"); }
    if (box.ownerId !== this.userId) { throw new Meteor.Error(404, "No such box"); }

    if (member._id !== box.ownerId && !_.contains(box.members, member._id)) {
      Boxes.update(boxId, { $addToSet: { members: member._id } });

      if (Meteor.isServer) {
        // This code only runs on the server. If you didn't want clients
        // to be able to see it, you could move it to a separate file.

        Accounts.emailTemplates.enrollAccount.text = function (user, url) {
          url = url.replace('#/', '');
          return [
            "You've been added to ", box.name, " on Boxify by ", box.ownerName, "!\n\n",
           "Click the link below to activate your account:\n", url
          ].join("");
        };

        // Accounts.sendEnrollmentEmail(member._id);
      }
    }
  },

  createMember: function(opts){
    opts = opts || null;
    if (!opts) return;

    var boxId = opts.boxId;
    var email = opts.email;
    var password = opts.password;

    var userId = Accounts.createUser({
      email: email,
      password: password
    })

    Meteor.users.update({_id: userId}, {
      $set: {
        boxId: boxId,
        profile: opts.profile
      }
    });

    return userId;
  }
});
