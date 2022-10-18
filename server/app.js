const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3001;

// router
const indexRouter = require('./router/index');
const routeTodos = require('./router/todos');
const routeAccount = require('./router/account');

app.use(express.static('build'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// router
app.use('/', indexRouter);

app.use('/todos', routeTodos);
app.use('/account', routeAccount);

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
