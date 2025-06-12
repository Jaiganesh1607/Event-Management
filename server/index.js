const express =require('express');

//Middlewares
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
const connectDB = require('./Models/db.js');
connectDB();

//port
const port = 5000 || process.env.PORT;

//Routes
const organizerEvents = require('./routes/organizer/events.js');
const organizerProfile=require('./routes/organizer/profile.js');
const organizerRegister =require('./routes/organizer/register.js');

app.use('/api/organizer/events', organizerEvents);
app.use('/api/organizer/profile', organizerProfile);
app.use('/api/organizer/register', organizerRegister);

// Start Server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
