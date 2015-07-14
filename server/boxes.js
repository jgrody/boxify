Meteor.publish("boxes", function () {
  return Boxes.find({
    $or:[
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]}
    ]});
});