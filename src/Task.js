// // App.js

// import React, { useState } from 'react';
// import TaskList from './TaskList';
// import TaskSummaryPage from './TaskSummaryPage';

// function Task() {
//   const [tasks, setTasks] = useState([]);

//   const addTask = (newTask) => {
//     setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
//   };

//   const updateTaskStatus = (taskId, newStatus) => {
//     setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
//   };

//   // const assignTask = (assignedUser) => {
//   //   setTasks(tasks.map({ ...tasks, assignedTo: assignedUser }));
//   // };
  
//   const assignTask = (id, assignedUser) => {
//     setTasks(tasks.map(t => t.id === id ? { ...t, assignedTo: assignedUser } : t));
//   };

// //   const assignTask = (assignedUser) => {
// //     setTasks(tasks.map(task => ({ ...task, assignedTo: assignedUser })));
// //   };

//   return (
//     <div className="App">
//       <h1>Task List Application</h1>
//       <TaskList tasks={tasks} addTask={addTask} updateTaskStatus={updateTaskStatus} assignTask={assignTask} />
//       <TaskSummaryPage tasks={tasks} />
//     </div>
//   );
// }

// export default Task;

// App.js

import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskSummaryPage from './TaskSummaryPage';

function Task() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const assignTask = (id, assignedUser) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, assignedTo: assignedUser } : t));
  };

  return (
    <div className="App">
      <h1>Task List Application</h1>
      <TaskList tasks={tasks} addTask={addTask} updateTaskStatus={updateTaskStatus} assignTask={assignTask} />
      <TaskSummaryPage tasks={tasks} />
    </div>
  );
}

export default Task;

