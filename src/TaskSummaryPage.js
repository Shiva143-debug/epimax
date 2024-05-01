// TaskSummaryPage.js

import React from 'react';

function TaskSummaryPage({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status !== 'completed').length;

  return (
    <div className="TaskSummaryPage">
      <h2>Task Summary</h2>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <p>Pending Tasks: {pendingTasks}</p>
      {/* Add data visualization here */}
    </div>
  );
}

export default TaskSummaryPage;
