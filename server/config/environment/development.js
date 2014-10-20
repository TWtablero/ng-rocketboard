'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/rockboard-dev'
  },

  repositories: [{
    username: "marcioviegas",
    name: "rocketboard-1"
  },{
    username: "marcioviegas",
    name: "rocketboard-2"
  },{
    username: "marcioviegas",
    name: "rocketboard-3"
  }],

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
