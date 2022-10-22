const mongoose = require('mongoose');

// initialize config
const config = require('../config');

const connect = () => {
  mongoose.connect(config.mongodbConnectURL);
};

mongoose.connection.once('open', function () {
  console.log('Connected! MongoDB index');
});

mongoose.connection.on('error', function () {
  console.log('Connection Failed!');
});

mongoose.connection.on('disconnected', () => {
  console.error('mongoDB disconnected retry connect');
  connect();
});

module.exports = connect;
