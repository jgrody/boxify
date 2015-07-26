Meteor.startup(function () {
  Meteor.users.remove({});

  var ownerId, boxId, memberId;

  var owner = {
    email: 'jtg028@gmail.com',
    password: 'kahuna',
    passwordConfirm: 'kahuna'
  }

  if (Meteor.users.find().count() === 0){
    ownerId = Accounts.createUser(owner);
  }

  Boxes.remove({});
  if (Boxes.find().count() === 0) {
    boxId = Boxes.insert({
      ownerId: ownerId,
      name: 'The Hot Box',
      ownerName: 'Jack Grossmann',
      members: []
    })
  }

  var member = {
    email: 'jack.grossmann@gmail.com',
    password: 'kahuna',
  };

  var additionalProps = {
    boxId: boxId,
    invited: false,
    profile: {
      firstName: 'Jack',
      lastName: 'Grossmann'
    }
  }
  memberId = Accounts.createUser(member);

  Meteor.users.update({_id: memberId}, {$set: additionalProps});
});