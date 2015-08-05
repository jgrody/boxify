(function () {

  'use strict';

  var _ = require('underscore');

  module.exports = function () {

    var url = require('url');

    this.Given(/^I am a new user$/, function () {
      // no callbacks! DDP has been promisified so you can just return it
      return this.server.call('reset'); // this.ddp is a connection to the mirror
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath) {
      // WebdriverIO supports Promises/A+ out the box, so you can return that too
      return this.client. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
        url(url.resolve(process.env.ROOT_URL, relativePath)); // process.env.ROOT_URL always points to the mirror
    });

    this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle) {
      // you can use chai-as-promised in step definitions also
      return this.client.
        waitForVisible('body *').
        getText('#site-title').should.become(expectedTitle);
    });

    this.Given(/^I am logged in$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      this.client.
      url(process.env.ROOT_URL).
      waitForExist('body *').
      waitForVisible('body *').
      click('#login-btn').
      setValue('#email', 'bob@example.com').
      setValue('#password', 'testtest').
      click('#login-form-submit')
      .waitForExist('.box-name', 7000)
      .call(callback);
    });

    this.When(/^I visit "([^"]*)"$/, function (arg1, callback) {
      callback();
      // return this.client.
      //   url(url.resolve(process.env.ROOT_URL, arg1));
    });

    this.Then(/^I should see my members$/, function (callback) {
      return this.client
        .saveScreenshot(process.env.PWD + '/auth1.png')
        .waitForExist('.box-name', 7000)
        .waitForVisible('.box-name')
        .call(callback)

      // Write code here that turns the phrase above into concrete actions
      // callback.pending();
    });


  };

})(); 