import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express();
const port = 3000;

app.use(express.static('build'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
  // res.send('Hello WORLD');
});

// 모든 경로 처리
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(port, () => {
  console.log(`server is running is ${port}`);
});
