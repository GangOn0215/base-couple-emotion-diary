const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const indexRouter = require('./router/index');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

// router
app.use('/', indexRouter);

// 모든 경로 처리 - 리액트 에서 라우터 페이징
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});
app.listen(port, () => {
  console.log(`server is running is ${port}`);
});
