module.exports = function() {
  this.Before(function(done) {

    var client = this.client;
    var server = this.server;

    this.AuthenticationHelper = {

      loginOwner: function() {
        return client
          .url(process.env.ROOT_URL)
          .waitForExist('#login-btn')
          .click('#login-btn')
          .setValue('#email', 'owner@boxify.com')
          .setValue('#password', 'password')
          .click('#login-form-submit')
          .waitForExist('.box-name', 7000);
      },

      logout: function() {
        return client.executeAsync(function(done) {
          Meteor.logout(done);
        });
      },

      // createAccount: function(profile) {
      //   profile = profile || {
      //     periodEnd: Math.floor(new Date().getTime() / 1000)
      //   };

      //   return server.call('fixtures/createAccount', {
      //     email: 'me@example.com',
      //     password: 'letme1n',
      //     profile: profile
      //   });
      // },

      // createAccountAndLogin: function(profile) {
      //   var self = this;
      //   return self.createAccount(profile).then(function() {
      //     return self.login();
      //   });
      // }

    };

    done();

  });
};