// // TaskList.js

// import React, { useState } from 'react';
// import TaskStatusButtons from './TaskStatusButtons';

// function TaskList({ tasks, addTask, updateTaskStatus, assignTask }) {
//   const [newTaskName, setNewTaskName] = useState('');
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [assignedUser, setAssignedUser] = useState('');
//   const [id, setId] = useState('');
//   const [selectedTaskId,setSelectedTaskId]= useState(null);

//   const handleAddTask = () => {
//     if (newTaskName.trim() !== '') {
//       addTask({ name: newTaskName, status: 'pending', assignedTo: '' });
//       setNewTaskName('');
//       setSelectedTask({ name: newTaskName, status: 'pending', assignedTo: '' ,id:""});
//     }
//   };

//   const handleUpdateTaskStatus = (taskId, newStatus) => {
//     updateTaskStatus(taskId, newStatus);
//     // setSelectedTask(true);
//   };

//   // const handleAssignTask = () => {
//   //   assignTask(selectedTask, assignedUser);
//   //   setSelectedTask(null);
//   //   setAssignedUser('');
//   // };


//   // const onsetassignedUser=(e)=>{
//   //   setAssignedUser(e.target.value)
//   //   setId(e.target.id)
//   //   setSelectedTask({ name: newTaskName, status: 'pending', assignedTo: '' ,id:e.target.id});
//   // }

//   const onsetassignedUser = (e,taskId) => {
//     setAssignedUser(e.target.value);
//     // setId(e.target.id); // Assuming setId is a function to update the selectedTask ID
//     // const taskId = e.target.options[e.target.selectedIndex].id;
//     setSelectedTask({ assignedTo: e.target.value });
//   }
  

//   const handleAssignTask = () => {
//     if (selectedTask) {
//       // assignTask(selectedTask.id, assignedUser);
//       assignTask(selectedTaskId,selectedTask.assignedTo)
//       setSelectedTask(null);
//       setAssignedUser('');
//     }
//   };


 
//   return (
//     <div className="TaskList">
//       <h2>Task List</h2>
//       <input
//         type="text"
//         placeholder="Enter task name"
//         value={newTaskName}
//         onChange={(e) => setNewTaskName(e.target.value)}
//       />
//       <button onClick={handleAddTask}>Add Task</button>


//       {selectedTask && (
//         <div>

//           <h3>Assign Task</h3>
         
          
//           <select value={assignedUser} 
//           // onChange={(e) => setAssignedUser(e.target.value)}
//            onChange={onsetassignedUser}>
//             <option value="">Select User</option>
//             <option id="1" value="user1">User 1</option>
//             <option id="2" value="user2">User 2</option>
//             <option id="3" value="user3">User 3</option>
//           </select>
//           <button onClick={handleAssignTask}>Assign Task</button>
//         </div>
//       )}

      
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index}>
//             {task.name} - {task.status} - Assigned To: {task.assignedTo}
//             <button onClick={() => setSelectedTaskId(task.id)}>Assign Task</button>
//             <TaskStatusButtons
//               taskId={task.id}
//               onStart={(taskId) => handleUpdateTaskStatus(taskId, 'in_progress')}
//               onEnd={(taskId) => handleUpdateTaskStatus(taskId, 'pending')}
//               onComplete={(taskId) => handleUpdateTaskStatus(taskId, 'completed')}
//             />


//           </li>
//         ))}
//       </ul>
   
//     </div>
//   );
// }

// export default TaskList;

// TaskList.js

import React, { useState } from 'react';
import TaskStatusButtons from './TaskStatusButtons';

function TaskList({ tasks, addTask, updateTaskStatus, assignTask }) {
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [assignedUser, setAssignedUser] = useState('');
  const[status,setChangeStatus]=useState(false)

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      addTask({ name: newTaskName, status: 'not started', assignedTo: '' });
      setNewTaskName('');
    //   setChangeStatus(false)
    }
  };

  const handleAssignTask = () => {
    if (selectedTaskId && assignedUser !== '') {
      assignTask(selectedTaskId, assignedUser);
      setSelectedTaskId(null);
      setAssignedUser('');
      setChangeStatus(true)
    }
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
    // setSelectedTask(true);
  };

  const changeStatus=(id)=>{
    setSelectedTaskId(id)
    
  }

  return (
    <div className="TaskList">
      <h2>Task List</h2>
      <input
        type="text"
        placeholder="Enter task name"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      {selectedTaskId && (
        <div>
          {/* <h3>Assign Task</h3> */}
          <select
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
          >
            <option value="">Select User</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
          </select>
          <button onClick={handleAssignTask}>Assign User</button>
        </div>
      )}

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name} -{task.status}- Assigned To: {task.assignedTo || 'Not Assigned'}
            {/* <button 
            // onClick={() => setSelectedTaskId(task.id)}
            onClick={changeStatus(task.id)}
            >{status?"Assign":"update"} User</button> */}

{/* <button onClick={() => changeStatus(task.id)}>{status ? "Upate" : "Assign"} User</button> */}
 <button onClick={() => changeStatus(task.id)}>Assign User</button>


             <TaskStatusButtons
              taskId={task.id}
              onStart={(taskId) => handleUpdateTaskStatus(taskId, 'in_progress')}
              onEnd={(taskId) => handleUpdateTaskStatus(taskId, 'pending')}
              onComplete={(taskId) => handleUpdateTaskStatus(taskId, 'completed')}
            />
            {/* <button onClick={() => updateTaskStatus(task.id, 'completed')}>Mark Completed</button> */}
          </li>
        ))}
      </ul>

        {/* <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name} - {task.status} - Assigned To: {task.assignedTo}
            
            <TaskStatusButtons
              taskId={task.id}
              onStart={(taskId) => handleUpdateTaskStatus(taskId, 'in_progress')}
              onEnd={(taskId) => handleUpdateTaskStatus(taskId, 'pending')}
              onComplete={(taskId) => handleUpdateTaskStatus(taskId, 'completed')}
            />


          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default TaskList;

