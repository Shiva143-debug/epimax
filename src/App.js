

import React, { Component } from 'react';
import TaskAssignmentDropdown from './TaskAssignmentDropdown';
import TaskSummary from './TaskSummary';
import axios from 'axios';

class App extends Component {
  state = {
    tasks: [],
    users: [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
      { id: 3, name: 'User3' },
      { id: 4, name: 'team' }
    ],
    newTaskName: '',
    selectedUser: null,
    user: null,
    useris: "admin",
    filteredTasks: [],
    userId: null,
    userName: "",
    username: '',
  };



  handleSelectUser = (userId) => {
    this.setState({ selectedUser: userId });
  };

  handleInputChange = (e) => {
    this.setState({ newTaskName: e.target.value });
  };


  onChangeUser = (e) => {
    // this.setState({ user: e.target.value })
    const selectedUser = this.state.users.find(user => user.id === parseInt(e.target.value));
    this.setState({ user: selectedUser.id, userId: selectedUser.id, userName: selectedUser.name });
  }


  handleAddTask = () => {
    const { newTaskName, tasks, selectedUser, users } = this.state;
    if (newTaskName === "" || selectedUser === null) {
      alert('Please enter a task name and select a user');
      return;
    }

    let assignees = [];
    if (users[selectedUser - 1].name === 'team') {
      assignees = users.filter(user => user.name !== 'team').map(user => user.id);
    } else {
      assignees.push(selectedUser);
    }

    const newTasks = assignees.map(assigee => ({
      name: newTaskName,
      status: 'in_progress',
      assigee: assigee,
    }));

    newTasks.forEach(newTask => {
      axios.post('https://conscious-tar-structure.glitch.me/addtasks', newTask)
        .then(res => {
          console.log(res);
          this.fetchTasks();
        })
        .catch(error => {
          console.error('Error adding task:', error);
        });
    });

    this.setState({
      newTaskName: '',
      selectedUser: null,
    });
  };


  // handleAddTask = () => {
  //   const { newTaskName, tasks, selectedUser,users } = this.state;
  //   if (newTaskName === "" || selectedUser === null) {
  //     alert('Please enter a task name and select a user');
  //     return;
  //   }

  //   // let assigees = [];
  //   // if (parseInt(selectedUser) === 4) {
  //   //     assigees = users.filter(user => user.id !== 4).map(user => user.id);
  //   // } else {
  //   //     assigees = [selectedUser];
  //   // }

  //   const newTask = {
  //     name: newTaskName,
  //     status: 'in_progress',
  //     assigee: parseInt(selectedUser),
  //   };

  //   axios.post('https://conscious-tar-structure.glitch.me/addtasks', newTask)
  //   .then(res => {
  //     console.log(res);
  //     this.fetchTasks();
  //   })

  //   this.setState({
  //     newTaskName: '',
  //     selectedUser: null,
  //   });


  // };



  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    axios.get('https://conscious-tar-structure.glitch.me/gettasks')
      .then(response => {
        const tasks = response.data || []; // Ensure tasks is an array
        this.setState({ tasks });
      })
      .catch(error => console.error('Error fetching tasks:', error));
  };



  onChangeUserFOrSummary = (e) => {
    const selectedUser = this.state.users.find(user => user.id === parseInt(e.target.value));
    this.setState({ user: selectedUser.id, userId: selectedUser.id, userName: selectedUser.name });
  }

  Admin = () => {
    this.setState({ useris: "admin" })
    this.setState({ backgroundColorFor: "grey", color: "white" })
  }

  user = () => {
    this.setState({ useris: "user" })
    this.setState({ backgroundColor: "grey", color: "white" })
  }



  onChangeUsername = (e) => {
    this.setState({ username: e.target.value.toLowerCase() });
  };

  enter = () => {
    const { username, tasks, users } = this.state;
    const user = users.find(user => user.name.toLowerCase() === username);
    if (!user) {
      alert('User not found');
      return;
    }

    const filteredTasks = tasks.filter(task => task.assigee == user.id);
    this.setState({ filteredTasks });
  };


  handleStatusUpdate = (taskId, status) => {
    const newData = { taskId, status }
    axios.put("https://conscious-tar-structure.glitch.me/updatetask", newData)
      .then(res => {
        console.log(res);
        const updatedTasks = this.state.tasks.map(task =>
          task.id === taskId ? { ...task, status: status } : task
        );

        // this.setState({ tasks: updatedTasks });   
        this.setState({ tasks: updatedTasks }, () => {
          // Update filteredTasks after updating tasks
          this.updateFilteredTasks();
        });

      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };


  updateFilteredTasks = () => {
    const { tasks, users, username } = this.state;
    const user = users.find(user => user.name.toLowerCase() === username);
    if (!user) {
      alert('User not found');
      return;
    }

    const filteredTasks = tasks.filter(task => task.assigee == user.id);
    this.setState({ filteredTasks });
  };


  render() {
    const { tasks, users, newTaskName, selectedUser, user, useris, filteredTasks, username } = this.state;


    return (

      <div style={{backgroundColor:"whitesmoke"}}>
        <div>
          <button class="w-50 p-2" style={{
            backgroundColor: this.state.useris === "admin" ? "grey" : "white",
            color: this.state.useris === "admin" ? "white" : "black", border: "none", borderRight: "1px solid gray", pointer: "curser"
          }} onClick={this.Admin}>ADMIN</button>
          <button class="w-50 p-2" style={{
            backgroundColor: this.state.useris === "user" ? "grey" : "white",
            color: this.state.useris === "user" ? "white" : "black", border: "none",
          }} onClick={this.user}>USER</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

          {useris === "admin" &&
            <>

              <h1 className="mt-5">ADD TASK</h1>


              <div className="d-flex mt-2 p-5" style={{ backgroundColor: 'whitesmoke', borderRadius: "8px" }}>
                <input
                  type="text"
                  placeholder="Enter task name"
                  value={newTaskName}
                  onChange={this.handleInputChange}
                  className="form-control mx-2"
                />
                <TaskAssignmentDropdown
                  users={users}
                  onSelectUser={this.handleSelectUser}
                  selectedUser={selectedUser}

                />
                <button onClick={this.handleAddTask} className="btn btn-success" style={{ width: "300px" }}>Add Task</button>
              </div>


<hr style={{width:"100%"}}/>

              <h1 className="mt-5">Task List</h1>

              <table style={{ borderCollapse: 'collapse', width: '60%' }}>
                <thead>
                  <tr className="text-center">
                    <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>

                    <th style={{ border: '1px solid black', padding: '8px' }}>Assignee</th>

                    {!useris === "admin" &&
                      <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                    }

                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td style={{ border: '1px solid black', padding: '8px', backgroundColor: task.id % 2 === 0 ? '#f2f2f2' : '#e6e6e6' }}>{task.name}</td>
                      <td style={{ border: '1px solid black', padding: '8px', backgroundColor: task.id % 2 === 0 ? '#f2f2f2' : '#e6e6e6' }}>{task.status}</td>
                      <td style={{ border: '1px solid black', padding: '8px', backgroundColor: task.id % 2 === 0 ? '#f2f2f2' : '#e6e6e6' }}>{task.assigee ? users.find(user => user.id == task.assigee).name : 'Unassigned'}</td>

                      {!useris === "admin" &&
                        <td style={{ border: '1px solid black', padding: '8px', backgroundColor: task.id % 2 === 0 ? '#f2f2f2' : '#e6e6e6', display: "flex" }}>

                          <button onClick={() => this.handleStatusUpdate(task.id, 'in_progress')} style={{ backgroundColor: "grey", border: "none", marginRight: "10px", padding: "5px", borderRadius: "4px" }}>In Progress</button>
                          <button onClick={() => this.handleStatusUpdate(task.id, 'pending')} style={{ backgroundColor: "yellow", border: "none", marginRight: "10px", padding: "5px", borderRadius: "4px" }}>Pending</button>
                          <button onClick={() => this.handleStatusUpdate(task.id, 'done')} style={{ backgroundColor: "green", border: "none", marginRight: "10px", padding: "5px", borderRadius: "4px" }}>Completed</button>
                        </td>

                      }


                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          }


{/* <hr style={{width:"100%"}}/> */}

<hr style={{ width: "100%", boxShadow: "16px 16px 4px rgba(0, 0, 0, 0.2)" }} />

          {useris === "user" &&
            <div class="vh-100">

              <div class="mt-5 d-flex mb-5">

                <label class="mx-2 pt-2">Enter user Name:   </label>

                <input
                  type="text"
                  className="form-control mx-2"
                  style={{ width: "200px" }}
                  value={username}
                  onChange={this.onChangeUsername}
                />
                <button onClick={this.enter} class="btn btn-primary">Enter</button>


              </div>
              <table style={{ borderCollapse: 'collapse', width: '60%' }}>
                <thead>
                  <tr className="text-center">
                    <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>

                    {!useris === "admin" &&
                      <th style={{ border: '1px solid black', padding: '8px' }}>Assignee</th>
                    }
                    <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id}>
                      <td style={{ border: '1px solid black', padding: '8px', backgroundColor: task.id % 2 === 0 ? '#f2f2f2' : '#e6e6e6' }}>{task.name}</td>
                      <td style={{ border: '1px solid black', padding: '8px', backgroundColor: task.id % 2 === 0 ? '#f2f2f2' : '#e6e6e6' }}>{task.status}</td>
                      {!useris === "admin" &&
                        <td style={{ border: '1px solid black', padding: '8px', backgroundColor: task.id % 2 === 0 ? '#f2f2f2' : '#e6e6e6' }}>{task.assigee ? users.find(user => user.id == task.assigee).name : 'Unassigned'}</td>

                      }
                      <td style={{ border: '1px solid black', padding: '8px', backgroundColor: task.id % 2 === 0 ? '#f2f2f2' : '#e6e6e6', display: "flex" }}>

                        <button onClick={() => this.handleStatusUpdate(task.id, 'in_progress')} style={{ backgroundColor: "grey", border: "none", marginRight: "10px", padding: "5px", borderRadius: "4px" }}>In Progress</button>
                        <button onClick={() => this.handleStatusUpdate(task.id, 'pending')} style={{ backgroundColor: "yellow", border: "none", marginRight: "10px", padding: "5px", borderRadius: "4px" }}>Pending</button>
                        <button onClick={() => this.handleStatusUpdate(task.id, 'completed')} style={{ backgroundColor: "green", border: "none", marginRight: "10px", padding: "5px", borderRadius: "4px" }}>Completed</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }


          {useris === "admin" &&
            <>
              <div class="d-flex mx-5 mt-5">
                <label class="pt-2">select the user: </label>
                <select onChange={this.onChangeUserFOrSummary} class="form-control mx-2" style={{ width: "200px" }} >
                  <option value="">Select the user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>

              </div>

              <h1>Task Summary of :{this.state.userName} is </h1>

              <TaskSummary tasks={tasks} userId={this.state.userId} />
            </>

          }
        </div>
      </div>
    );
  }
}

export default App;
