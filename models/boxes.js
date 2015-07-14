Boxes = new Mongo.Collection("boxes");

Boxes.allow({
  insert: function (userId, box) {
    return userId && box.owner === userId;
  },
  update: function (userId, box, fields, modifier) {
    return userId && box.owner === userId;
  },
  remove: function (userId, box) {
    return userId && box.owner === userId;
  }
});