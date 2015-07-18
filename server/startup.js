Meteor.startup(function () {
  Meteor.users.remove({});

  var userId, boxId;

  var users = [
    {
      email: 'jackgro@me.com',
      password: 'kahuna',
      // passwordConfirm: 'kahuna'
    }
  ]

  if (Meteor.users.find().count() === 0){
    userId = Accounts.createUser(users[0]);
  }

  Boxes.remove({});
  if (Boxes.find().count() === 0) {
    boxId = Boxes.insert({
      ownerId: userId,
      name: 'The Hot Box',
      ownerName: 'Jack Grossmann'
    })
  }

  Members.remove({});
  var members = [
    {
      firstName: 'Joe',
      lastName: 'Schmo',
      email: 'joe@schmo.com'
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@doe.com'
    }
  ];

  if (Members.find().count() === 0) {
    members.each(function(member){
      Members.insert({
        boxId: boxId,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email
      })
    })
  }

});