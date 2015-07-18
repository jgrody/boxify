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