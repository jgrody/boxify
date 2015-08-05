(function () {

  'use strict';

  var _ = require('underscore');

  module.exports = function () {

    var url = require('url');
    var assert = require('assert');

    this.Given(/^I am a logged in owner$/, function (callback) {
      var self = this;

      return this.server.call('addOwner', {
        email: 'owner@boxify.com',
        password: 'password'
      }).then(function(ownerId){
        return self.server.call('addBox', {});
      }).then(function(boxId){
        self.AuthenticationHelper.loginOwner();
      }).then(callback)
    });

    this.Given(/^I own a box called "([^"]*)"$/, function (arg1, callback) {
      return this.server.call('addBox').then(callback);
    });

    this.Given(/^I am a box owner$/, function (callback) {
      return this.server.call('addOwner', {
        email: 'owner@boxify.com',
        password: 'password'
      });
    });

    this.Given(/^I have a box called "([^"]*)"$/, function (arg1, callback) {
      return this.server.call('addBox', { name: arg1 });
    });

    this.Given(/^I have logged in$/, function (callback) {
      return this.AuthenticationHelper.loginOwner();
    });

    this.Given(/^I have a member named "([^"]*)"$/, function (name, callback) {
      return this.server.call('addMember', { name: name });
    });

    this.Given(/^I add a member named "([^"]*)"$/, function (arg1, callback) {
      var name = arg1.split(" ");
      return this.client
        .click('.add-member')
        .setValue('#first-name-field', name[0])
        .setValue('#last-name-field', name[1])
        .setValue('#email-field', 'member@boxify.com')
        .waitForVisible("#add-member", 7000)
        .click("#add-member")
        .waitForVisible('.member-name')
    });

    this.When(/^I delete the user$/, function (callback) {
      return this.client
        .waitForExist('.delete-member', 7000)
        .waitForVisible('.delete-member', 7000)
        .click('.delete-member')
        .waitForVisible('.md-button.md-primary')
        .click('.md-button.md-primary:nth-child(2)')
    });

    this.Then(/^I should see a confirmation that they were deleted$/, function (callback) {
      return this.client
        .isVisible('.toast-success')
        .waitForExist('.toast-success')
        .waitForVisible('.toast-success')
        .should
        .become(true)
    });

    this.Then(/^I should no longer see them in the list$/, function (callback) {
      return this.client
        .waitForExist('.toast-success')
        .isVisible('.member-name').should.become(false);
    });

    this.Then(/^I should be able to see "([^"]*)"$/, function (arg1, callback) {
      return this.client
        .getText('.member-name').should.become(arg1)
    });

    this.Then(/^I should be able to see that their membership status is "([^"]*)"$/, function (arg1, callback) {
      return this.client
        .getText('.member-status-pending').should.become(arg1)
    });

    this.Then(/^I should see "([^"]*)" on my dashboard$/, function (arg1, callback) {
      return this.client
        .getText('.box-name').should.become(arg1)
    });


  };

})(); 