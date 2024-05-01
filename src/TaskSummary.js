import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TaskSummary = ({ tasks ,userId}) => {

    const filteredTasks = userId ? tasks.filter(task => task.assigee == userId) : tasks;
  const data = [

    { name: 'In Progress', count: filteredTasks.filter((task) => task.status === 'in_progress').length },
    { name: 'Pending', count: filteredTasks.filter((task) => task.status === 'pending').length },
    { name: 'Completed', count: filteredTasks.filter((task) => task.status === 'completed').length },
  ];

  return (
    <div>
      {/* <h1 class="mt-5">Task Summary</h1> */}
      <BarChart width={1000} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TaskSummary;