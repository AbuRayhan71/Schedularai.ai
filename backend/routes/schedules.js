const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const OpenAI = require('openai-api');

const OPENAI_API_KEY = 'your_openai_api_key';
const openai = new OpenAI(OPENAI_API_KEY);

router.post('/', async (req, res) => {
  const { title, description, date } = req.body;

  const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: `Create a schedule with the following details:\nTitle: ${title}\nDescription: ${description}\nDate: ${date}`,
    maxTokens: 50
  });

  const schedule = new Schedule({ title, description, date });
  await schedule.save();

  res.send(schedule);
});

router.get('/', async (req, res) => {
  const schedules = await Schedule.find();
  res.send(schedules);
});

module.exports = router;
