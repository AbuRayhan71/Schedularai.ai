import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleList from './components/ScheduleList';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get('/api/schedules')
      .then(response => setSchedules(response.data))
      .catch(error => console.error('Error fetching schedules:', error));
  }, []);

  const handleAddSchedule = () => {
    axios.post('/api/schedules', { title, description, date })
      .then(response => {
        setSchedules([...schedules, response.data]);
        setTitle('');
        setDescription('');
        setDate('');
      })
      .catch(error => console.error('Error adding schedule:', error));
  };

  return (
    <div>
      <h1>Scheduler</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button onClick={handleAddSchedule}>Add Schedule</button>
      </div>
      <ScheduleList schedules={schedules} />
    </div>
  );
}

export default App;
