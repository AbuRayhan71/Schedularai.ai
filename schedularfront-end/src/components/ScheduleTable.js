import React from 'react';

function ScheduleTable({ schedules }) {
  return (
    <div>
      <h2>Schedules</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time Window</th>
            <th>Task Category</th>
            <th>Prompt</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule._id}>
              <td>{schedule.title}</td>
              <td>{schedule.description}</td>
              <td>{new Date(schedule.date).toLocaleDateString()}</td>
              <td>{schedule.timeWindow}</td>
              <td>{schedule.taskCategory}</td>
              <td>{schedule.prompt}</td>
              <td>{schedule.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;
