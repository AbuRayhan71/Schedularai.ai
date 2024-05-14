import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure this path is correct based on the location of App.css

function App() {
  const [prompt, setPrompt] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5050/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError('Error fetching schedules');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Prompt is required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5050/schedules', { prompt });
      console.log('Response:', response);
      if (response.data) {
        setSchedules([...schedules, response.data]);
      } else {
        setError('Error adding schedule: No data in response');
      }
      setPrompt('');
    } catch (error) {
      console.error('Error adding schedule:', error);
      setError('Error adding schedule: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Scheduler</h1>
      <form onSubmit={handleSubmit} className="schedule-form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      <h2>Generated Schedule</h2>
      <div className="schedule-output">
        {schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <div key={index} className="schedule-item">
              <p><strong>Title:</strong> {schedule.title}</p>
              <p><strong>Description:</strong> {schedule.description}</p>
              <p><strong>Date:</strong> {schedule.date}</p>
              <p><strong>Time Window:</strong> {schedule.timeWindow}</p>
              <p><strong>Task Category:</strong> {schedule.taskCategory}</p>
              <p><strong>Priority:</strong> {schedule.priority}</p>
              <p><strong>Prompt:</strong> {schedule.prompt}</p>
            </div>
          ))
        ) : (
          <p>No schedules generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
