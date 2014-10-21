'use strict';

var _ = require('lodash');

var session = require('express-session');
var config = require('../../config/environment');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.login = function(req, res) {
  var getAuthTokenUrl = 'https://github.com/login/oauth/access_token?' +
    'client_id=' + config.clientId +
    '&client_secret=' + config.sectretId +
    '&code=' + req.query.code;


  var xhr = new XMLHttpRequest();
  xhr.open('POST', getAuthTokenUrl, false);
  xhr.send();

  //TODO: Separar o access_token e validar se tem também :D
  req.session.access_token = xhr.responseText;
  if (xhr.responseText.indexOf("access_token") == -1) {
    res.redirect("https://github.com/login/oauth/authorize/?client_id=c8e53a399aaaf4423852&scope=public_repo");
  }

  res.json(200, req.session.access_token);
};

exports.logout = function(req, res) {
  req.session.access_token = null;
  res.redirect("/");
};

exports.loginToken = function(req, res) {
  console.log(req);

  if (req.session.access_token){
    res.json(200, req.session.access_token);
  }
  else {
    res.send(200, false);
  }
};

function handleError(res, err) {
  return res.send(500, err);
}
