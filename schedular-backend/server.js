const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/scheduler')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
const schedulesRoute = require('./routes/schedules');
app.use('/schedules', schedulesRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
