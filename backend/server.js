const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schedules = require('./routes/schedules');
const OpenAI = require('openai-api');

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = 'your_openai_api_key';
const openai = new OpenAI(OPENAI_API_KEY);

mongoose.connect('mongodb://localhost:27017/scheduler', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/schedules', schedules);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
