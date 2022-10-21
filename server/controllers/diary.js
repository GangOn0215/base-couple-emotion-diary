const config = require('./config');

// Model
const connect = require('../models');
const Member = require('../models/Member');

// mongoDB 연결
connect();

const query = async (req, res) => {
  // const getUser = await Member.findOne({ id: 'admin' });

  //row
  //63522484ce189d57cb8b4056
  //6350134d02abc717af5270dc
  const diary = await Member.findOne({ 'diary._id': '63522484ce189d57cb8b4056' }, { 'diary.$': 1 });
  const diaries = await Member.find({}, { diary: 1 });
  // const diary = await Member.find({}, { '$': 1 });
  // const getUserDiary = await Member.findOne({ id: 'admin' })
  console.log(diary);
  console.log(diaries.length);

  res.send(diary);
  // res.send(diaries);
};

const row = (req, res) => {
  // const diary = await
};
const lists = (req, res) => {};
const insert = async (req, res) => {
  const getUser = await Member.findOne({ _id: req.user.id });

  if (getUser) {
    Member.updateOne(
      { _id: getUser._id },
      {
        $push: {
          diary: {
            title: req.body.title,
            content: req.body.content,
            mood: req.body.mood,
          },
        },
      },
    ).then((err) => console.log(err));
  }
};

const update = async () => (req, res) => {};
const deleteOne = async () => (req, res) => {};

module.exports = {
  query,
  row,
  lists,
  insert,
  update,
  deleteOne,
};
