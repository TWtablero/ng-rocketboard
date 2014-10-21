'use strict';

var _ = require('lodash');

var config = require('../../config/environment');

exports.index = function(req, res) {
   res.json(200, config.repositories);
};

function handleError(res, err) {
  return res.send(500, err);
}
