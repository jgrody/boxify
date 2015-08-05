( function () {

  'use strict';

  var ownerId, boxId, memberId;

  Meteor.methods({
    reset: function(){
      Boxes.remove({});
      Meteor.users.remove({});
    },

    addOwner: function (opts) {
      opts = opts || {};
      Meteor.users.remove({});
      return ownerId = Accounts.createUser({
        email: opts.email,
        password: opts.password ? opts.password : "password",
        passwordConfirm: opts.password ? opts.password : "password",
        profile: {
          firstName: 'Jack',
          lastName: 'Grossmann'
        }
      });
    },

    addBox: function(opts){
      opts = opts || {};
      var owner = Meteor.users.findOne();

      return boxId = Boxes.insert({
        ownerId: ownerId,
        name: opts.name || 'The Hot Box',
        ownerName: opts.ownerName || 'Jack Grossmann',
        members: opts.members || []
      })
    },

    addMember: function(opts){
      opts = opts || {};
      var name = opts.name || "Jack Grossmann";
      name = name.split(" ")

      var memberId = Accounts.createUser({
        email: opts.email || "member@boxify.com",
        password: "password"
      });

      var box = Boxes.findOne();

      var additionalProps = {
        boxId: boxId,
        invited: false,
        profile: {
          firstName: name[0],
          lastName: name[1]
        }
      }

      Boxes.update(boxId, {$addToSet: {members: memberId}});

      return Meteor.users.update({_id: memberId}, { $set: additionalProps })
    }
  });

})();