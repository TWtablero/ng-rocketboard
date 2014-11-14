'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
      'mongodb://localhost/rocketboard'
  },

  clientId: "ac84f4d245497c6ec382",

  sectretId: "a1af8198eb92fa87ffb2421db03943f856305c83"
};