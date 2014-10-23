'use strict';

var _ = require('lodash');

var session = require('express-session');
var config = require('../../config/environment');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.login = function(req, res, next) {

  var getAuthTokenUrl = 'https://github.com/login/oauth/access_token?' +
    'client_id=' + config.clientId +
    '&client_secret=' + config.sectretId +
    '&code=' + req.query.code;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', getAuthTokenUrl, false);
  xhr.send();

  res.redirect("/api/login/token?"+ xhr.responseText);
};

exports.loginToken = function(req, res, next) {
  req.session.access_token = req.query.access_token;
  console.log("Obteve token: " + req.session.access_token);
  res.redirect("/?access_token="+ req.query.access_token);
};

exports.logout = function(req, res) {
  req.session.access_token = null;
  res.redirect("/");
};



function handleError(res, err) {
  return res.send(500, err);
}
