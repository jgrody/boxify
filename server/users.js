Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish("members", function () {
  if (this.userId) {
    return Meteor.users.find({
      $or:[
        {$and:[
          {ownerId: {$exists: false}}
        ]},
        {$and:[
          {boxId: {$exists: true}}
        ]}
      ]}, {
      fields: {
        emails: 1,
        boxId: 1,
        acceptedInvite: 1,
        invited: 1,
        inviteToken: 1,
        profile: 1
      }
    });
  } else {
    this.ready();
  }
});