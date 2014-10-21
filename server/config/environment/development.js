'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/rockboard-dev'
  },

  repositories: [{
    id: "1",
    username: "marcioviegas",
    name: "rocketboard-1"
  }, {
    id: "2",
    username: "marcioviegas",
    name: "rocketboard-2"
  }, {
    id: "3",
    username: "marcioviegas",
    name: "rocketboard-3"
  }],
  
  clientId: "c8e53a399aaaf4423852",

  sectretId: "cf21bef34d5efa99fb4b8894017b9cf6c263b8a3",

  // repositories: [{
  //   username: "pixelated-project",
  //   name: "pixelated-user-agent"
  // }, {
  //   username: "pixelated-project",
  //   name: "pixelated-dispatcher"
  // }, {
  //   username: "pixelated-project",
  //   name: "pixelated-platform"
  // },
  // {
  //   username: "angular",
  //   name: "angular.js"
  // }],

  seedDB: true
};
