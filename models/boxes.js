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
  invite: function (opts) {
    opts = opts || null;
    if (opts) {
      var boxId = opts.boxId;
      var member = opts.member;
      var token = opts.token;

      check(boxId, String);
      check(member._id, String);
      check(token, String);
      var box = Boxes.findOne(boxId);

      if (!box) { throw new Meteor.Error(404, "No such box"); }
      if (box.ownerId !== this.userId) { throw new Meteor.Error(404, "No such box"); }

      Meteor.users.update(member._id, {$set: {inviteToken: token}});

      if (member._id !== box.ownerId && !_.contains(box.members, member._id) && !member.inviteToken) {
        Boxes.update(boxId, { $addToSet: { members: member._id } });

        var from = contactEmail(Meteor.users.findOne(this.userId));
        var to = contactEmail(member);

        if (Meteor.isServer && to) {
          // This code only runs on the server. If you didn't want clients
          // to be able to see it, you could move it to a separate file.
          Email.send({
            from: "noreply@boxify.com",
            to: to,
            replyTo: from || undefined,
            subject: "Boxify: " + box.name,
            text:
            "Hey, I just invited you to '" + box.name + "' on Boxify." +
            "\n\nCome check it out: " + memberRsvpUrl(member._id, token)
          });
        }
      }
    }
  }
});

var memberRsvpUrl = function(memberId, token){
  return [
    Meteor.absoluteUrl(),
    'reset-password/',
    token,
    '?memberId=',
    memberId
  ].join("");
}

var contactEmail = function(user) {
  if (user.emails && user.emails.length) {
    return user.emails[0].address;
  }
  if (user.services && user.services.facebook && user.services.facebook.email) {
    return user.services.facebook.email;
  }

  return null;
};