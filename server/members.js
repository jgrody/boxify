Meteor.publish("members", function () {
  return Members.find({
    $or:[
      {$and:[
        // {ownerId: this.userId},
        {boxId: {$exists: true}}
      ]}
    ]});
});