const express = require('express');
const path = require('path');
 
const app = express();
const PORT = 3000;
 
app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/home/index.html'));
})

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/not-found/index.html'));
})
 
app.listen(PORT, () => {
  console.log(`Мой текст и порт: ${PORT}!`);
});