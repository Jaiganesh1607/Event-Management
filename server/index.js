const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000 || process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/data', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Data received successfully!' });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});