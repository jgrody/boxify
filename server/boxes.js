Meteor.publish("boxes", function () {
  return Boxes.find({
    $or:[
      {$and:[
        {ownerId: this.userId},
        {ownerId: {$exists: true}}
      ]},
      {$and:[
        {members: {$exists: true}}
      ]}
    ]});
});