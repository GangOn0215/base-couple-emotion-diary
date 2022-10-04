const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const indexRouter = require('./router/index');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

// router
<<<<<<< HEAD
app.use('/', indexRouter);

// 모든 경로 처리 - 리액트 에서 라우터 페이징
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});
=======
const routeTodos = require('./router/todos');
const routeAccount = require('./router/account');

app.use('/todos', routeTodos);
app.use('/account', routeAccount);

// 모든 경로 처리 - 리액트 에서 라우터 페이징
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
  // res.send('Hello WORLD');
});

app.get('/todos/list', function (req, res) {
  res.json([
    {
      author: '1',
      title: '2',
      content: '3',
      emotion: 1,
      createAt: 1663678808338,
      updateAt: null,
      id: 2,
    },
    {
      author: '2',
      title: '2',
      content: '2',
      emotion: 1,
      createAt: 1663678530732,
      updateAt: 1663678805633,
      id: 1,
    },
  ]);
});

>>>>>>> fcdc1887bfe46b46afb571ec8ffaf3065b77428e
app.listen(port, () => {
  console.log(`server is running is ${port}`);
});
