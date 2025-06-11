const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const connectDB = require('./Models/db.js');
const port = 5000 || process.env.PORT;
const eventRoutes = require('./routes/events.js')

app.use(cors());
app.use(bodyParser.json());
// Connect to DB
connectDB();

// Routes
app.use('/api/events', eventRoutes);

// Start Server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
