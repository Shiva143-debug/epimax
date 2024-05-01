// TaskStatusButtons.js

import React from 'react';

function TaskStatusButtons({ taskId, onStart, onEnd, onComplete }) {
  return (
    <div className="TaskStatusButtons">
      <button onClick={() => onStart(taskId)}>Start</button>
      <button onClick={() => onEnd(taskId)}>End</button>
      <button onClick={() => onComplete(taskId)}>Complete</button>
    </div>
  );
}

export default TaskStatusButtons;
