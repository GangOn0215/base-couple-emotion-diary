import express from 'express';
import path from 'path';
import cors from 'cors';
const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('build'));
app.use(express.json());
app.use(cors);

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

// 모든 경로 처리
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(port, () => {
  console.log(`server is running is ${port}`);
});
