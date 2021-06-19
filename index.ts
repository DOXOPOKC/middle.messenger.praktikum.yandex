import express, { Request, Response } from "express";
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

// app.get('/', (request: Request, response: Response) => {
//   response.sendFile(path.join(__dirname + '/dist/index.html'));
// })

// app.use('*', (request: Request, response: Response) => {
//   response.sendFile(path.join(__dirname + '/dist/not-found/index.html'));
// })

app.listen(PORT, () => {
  console.log(`Мой текст и порт: ${PORT}!`);
});
