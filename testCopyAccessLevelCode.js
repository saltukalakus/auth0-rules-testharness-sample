'use strict';

var fs = require('fs');
var expect = require('chai').expect;
require('dotenv').config();
var runInSandbox = require("auth0-rules-testharness");


var user = {
  "name": "Richard Seldon",
  "email": "richard.seldon@auth0.com",
  "email_verified": true,
  "app_metadata": {"accessLevelCode": "zzz", "isSubscriber": true, "userJson":{"u":23223232}, "penName": "test" }  
};

var context = {
  "clientID": "wWXS5rz3asdfdfkzbCXho3zNPNv77c",
  "clientName": "My Auth0 Client",
  "connectionStrategy": "auth0",
  "idToken": {}
};

var configuration = {
  NAME: 'newTest'
};

var params = {
  timeout: 5,
  ca: '',
  tenant: process.env.AUTH0_TENANT,
  url: process.env.SANDBOX_URL,
  token: process.env.WEBTASK_TOKEN
};



describe('auth0-rules-testharness-more-tests', function () {


  it('should console log the context object', function (done) {

    console.log("running test...");

    var script = fs.readFileSync('./rules/copyAccessLevelCode.js', 'utf8');

    var callback = function (err, result, output, stats) {
      console.log('output: ', output);
      console.log('result: ', result);
      expect(result.context.idToken['http://demo.com/accessLevelCode']).to.equal('zzz');
      expect(result.context.idToken['http://demo.com/isSubscriber']).to.equal(true);
      expect(result.context.idToken['http://demo.com/drupal_id']).to.equal(23223232);
      expect(result.context.idToken.anotherOne).to.equal('hi there');
      done();
    };

    var args = [user, context, callback];
    runInSandbox(script, args, configuration, params);

  });
});