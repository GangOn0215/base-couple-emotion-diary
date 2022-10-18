const mongoose = require('mongoose');

const connect = () => {
  if (process.env.NODE_ENV === 'develop') {
    const private = require('../private.json');
    const mongoJSON = private.mongodb;
    mongoose.connect(
      `mongodb+srv://${mongoJSON.id}:${mongoJSON.pw}@cluster0.oiy1b.mongodb.net/couple_diary?retryWrites=true&w=majority`,
    );
  } else {
    mongoose.connect(process.env.MONGODB_URI);
  }
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
