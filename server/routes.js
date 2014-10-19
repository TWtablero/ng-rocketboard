/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function(app) {

  var clientId = "c8e53a399aaaf4423852";
  var sectretId = "cf21bef34d5efa99fb4b8894017b9cf6c263b8a3";
  var cookieParser = require('cookie-parser');
  var session = require('express-session');
  var config = require('./config/environment');

  // Here come dragons.
  app.use("/api/github/", function(req, res) {

    var getAuthTokenUrl = 'https://github.com/login/oauth/access_token?' +
      'client_id=' + clientId +
      '&client_secret=' + sectretId +
      '&code=' + req.query.code;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', getAuthTokenUrl, false);
    xhr.send();

    console.log(xhr.responseText);

    //TODO: Separar o access_token e validar se tem também :D
    req.session.access_token = xhr.responseText;
    if (xhr.responseText.indexOf("access_token") == -1) {
      res.redirect("https://github.com/login/oauth/authorize/?client_id=c8e53a399aaaf4423852&scope=public_repo");
    }

    res.redirect("/home");
  });

  app.use("/api/repositories", function(req, res){
    res.json(200, config.repositories);
  });

  app.use("/api/logout", function(req, res) {
    req.query.access_token = null;
    res.redirect("/");
  });

  app.use("/api/access", function(req, res) {

    if (req.session.access_token)
      res.json(200, req.session.access_token);
    else {
      res.send(200, false);
    }

  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
