import React from 'react';

function ScheduleList({ schedules }) {
  return (
    <div>
      <h2>Schedules</h2>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule._id}>
            {schedule.title} - {schedule.description} - {new Date(schedule.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduleList;
