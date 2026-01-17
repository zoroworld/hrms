import { useEffect, useState } from "react";
import api from "../api/api";
import EmployeeTable from "../components/EmployeeTable";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const fetchEmployees = async () => {
    const res = await api.get("employee/");
    console.log(res);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const createEmployee = async () => {
    try {
      await api.post("employee/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        department: department,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartment("");

      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating employee");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Employees</h1>

      {/* Create Employee */}
      <div className="bg-white p-4 rounded shadow mb-4 d-flex gap-3">
        <input
          className="form-control"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="form-control"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="form-select"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="Human Resources">HR</option>
          <option value="Information Technology">IT</option>
          <option value="Finance">Finance</option>
        </select>

        <button onClick={createEmployee} className="btn btn-primary">
          Add Employee
        </button>
      </div>

      {/* Table */}
      <EmployeeTable employees={employees} refresh={fetchEmployees} />
    </div>
  );
};

export default Employees;
