const express = require('express');

const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('./dist'));

app.get('/:page', (req, res) => {
	res.sendFile('./dist/index.html', {root: __dirname});
});

app.listen(PORT, HOSTNAME, () => {
	// eslint-disable-next-line
  console.log(`Server is running on http://${HOSTNAME}:${PORT}/`);
});
