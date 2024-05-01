import 'bootstrap/dist/css/bootstrap.min.css';

const TaskAssignmentDropdown = ({  users, onSelectUser }) => {
    return (
      <select onChange={(e) => onSelectUser( e.target.value)} class="form-control mx-2" style={{width:"300px"}} >
        <option value="">Assign to...</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    );
  };
  
  export default TaskAssignmentDropdown;