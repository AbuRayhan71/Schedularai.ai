import React from 'react';

function ScheduleList({ schedules }) {
  return (
    <div>
      <h2>Schedules</h2>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule._id}>
            <strong>{schedule.title}</strong><br />
            {schedule.description}<br />
            <em>{new Date(schedule.date).toLocaleDateString()}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduleList;
