import api from "../api/api";

const EmployeeTable = ({ employees, refresh }) => {
  const deleteEmployee = async (id) => {
    await api.delete(`employee/${id}/`);
    refresh();
  };

  const capitalizeFirst = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1) || '';

  return (
    <table className="table table-bordered table-hover bg-white">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{capitalizeFirst(emp.first_name)} {emp.last_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              <button className="btn btn-sm btn-primary me-2">Edit</button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteEmployee(emp.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
