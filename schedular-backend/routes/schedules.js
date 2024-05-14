
const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const axios = require('axios');

const OPENAI_API_KEY = 'sk-proj-cJzyLyPE4uvv7npGrWyft3T3B1bkFJxEgsaOUazdHDxXtVN9t3z'; // Replace with your OpenAI API key

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo',
        prompt: `Create a schedule with the following details: ${prompt}`,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    console.log('OpenAI response:', gptResponse.data);

    const generatedText = gptResponse.data.choices[0].text.trim();

    // Simplified example: Adjust this based on the actual format of the generated text
    const [title, description, date, timeWindow, taskCategory, priority] = generatedText.split('\n').map(line => line.split(': ')[1]);

    const schedule = new Schedule({
      title,
      description,
      date: new Date(date),
      timeWindow,
      taskCategory,
      prompt,
      priority,
    });

    await schedule.save();
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching OpenAI response or saving schedule:', error);
    res.status(500).json({ error: 'Error creating schedule' });
  }
});

router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Error fetching schedules' });
  }
});

module.exports = router;
