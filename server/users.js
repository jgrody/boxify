Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish("members", function (boxId) {
  if (this.userId && boxId) {
    return Meteor.users.find({
      $or:[
        {$and:[
          {boxId: {$exists: true}},
          {boxId: boxId}
        ]}
      ]}, {
      fields: {
        emails: 1,
        boxId: 1,
        invited: 1,
        profile: 1
      }
    });
  } else {
    this.ready();
  }
});