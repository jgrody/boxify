// server/smtp.js
Meteor.startup(function () {
  // smtp = {
  //   username: 'jack.grossmann@gmail.com',   // eg: server@gentlenode.com
  //   password: 'Kahuna!8',   // eg: 3eeP1gtizk5eziohfervU
  //   server:   'smtp.gmail.com',  // eg: mail.gandi.net
  //   port: 25
  // }

  // process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  process.env.MAIL_URL = 'smtp://jack.grossmann:Kahuna!8@smtp.gmail.com:465/';

  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = 'Boxify <no-reply@boxify.com>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'Boxify';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address';
  };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return [
      'Welcome to Boxify\n',
      'Click on the following link to verify your email address:\n',
      url
    ].join(" ");
  };

  Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Boxify, " + user.profile.name;
  };

  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    return "You've been added to Boxify!"
      + " To activate your account, simply click the link below:\n\n"
      + url;
  };

  Accounts.emailTemplates.resetPassword.text = function(user, url){
     url = url.replace('#/', '')
     return [
       "Hi\n\n",
       "Click this link to reset your password: \n\n",
        url
     ].join("");
  }

  // Accounts.onCreateUser(function(options, user) {
  //   user.profile = {};
  //
  //   // we wait for Meteor to create the user before sending an email
  //   Meteor.setTimeout(function() {
  //     Accounts.sendVerificationEmail(user._id);
  //   }, 2 * 1000);
  //
  //   return user;
  // });
});

