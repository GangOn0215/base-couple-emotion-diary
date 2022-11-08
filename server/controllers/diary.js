// Model
const connect = require('../models');
const Member = require('../models/Member');

// mongoDB 연결
connect();

const query = async (req, res) => {
  // const getUser = await Member.findOne({ id: 'admin' });

  //row
  //63522484ce189d57cb8b4056
  const diary = await Member.findOne({ 'diary._id': '63522484ce189d57cb8b4056' }, { 'diary.$': 1 });
  const diaries = await Member.find({}, { diary: 1 });
  // const diary = await Member.find({}, { '$': 1 });
  // const getUserDiary = await Member.findOne({ id: 'admin' })
  console.log(diary);
  console.log(diaries.length);

  res.send(diary);
  // res.send(diaries);
};

const row = async (req, res) => {
  let getRow = await Member.find({ 'diary._id': req.query.id }, { 'diary.$': 1 });
  let diary = [];

  if (getRow.length > 0) diary = getRow[0].diary[0];

  res.send({ diary: diary });
};

const lists = async (req, res) => {
  let getRows = await Member.findOne({ _id: req.user.id }, { diary: 1 });
  diaryList = getRows.diary;

  res.send({ list: diaryList });
};

const insert = async (req, res) => {
  const result = await Member.updateOne(
    { _id: req.user.id ? req.user.id : req.user._id },
    {
      $push: {
        diary: {
          title: req.body.title,
          content: req.body.content,
          mood: req.body.emotion,
          diaryDate: req.body.diaryDate,
        },
      },
    },
  );

  res.send(result);
};

const update = async (req, res) => {
  const result = await Member.updateOne(
    { _id: req.user.id, 'diary._id': req.body._id },
    {
      $set: {
        'diary.$.title': req.body.title,
        'diary.$.content': req.body.content,
        'diary.$.mood': req.body.mood,
      },
    },
  );

  res.send(result);
};

const deleteOne = async (req, res) => {};

const deleteAll = async (req, res) => {
  const userId = req.user.id ? req.user.id : req.user._id;

  const userInfo = await Member.findOne({ _id: userId });

  if (userInfo.authLV < 100) {
    res.send({ status: false, error: '권한 없음' });

    return;
  }

  const result = await Member.updateOne(
    { _id: userId },
    {
      $set: {
        diary: [],
      },
    },
  );

  res.send({ result: result, status: true });
};

module.exports = {
  query,
  row,
  lists,
  insert,
  update,
  deleteOne,
  deleteAll,
};
