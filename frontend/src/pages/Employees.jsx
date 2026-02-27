import { useEffect, useState } from "react";
import api from "../api/api";
import EmployeeTable from "../components/EmployeeTable";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import AlertMessage from "../components/AlertMessage";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });



  const fetchEmployees = async (pageNo) => {
    try {
      setError("");
      setLoading(true);
      const res = await api.get(`employee?page=${pageNo}&size=8`);
      // console.log(res);
      setEmployees(res.data.data);
      setTotalPages(res.data.total_pages);

    } catch (err) {
      // console.error(err);
      setAlert({
        type: "danger",
        message: "Failed to fetch employees or take time for 10s due to render cold start.",
      });
      setError(err.response?.data?.message || "Failed to fetch employees or take time for 2s - 10s due to render cold start.");
    } finally {
      setLoading(false);
    }

  };

  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  const createEmployee = async () => {
    try {
      await api.post("employee/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        department: department,
      });

      setAlert({
        type: "success",
        message: "Employee created successfully",
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartment("");

      fetchEmployees(page);
    } catch (err) {
      setAlert({
        type: "danger",
        message: "Failed to fetch employees or take time for 10s due to render cold start.",
      });
      setError(err.response?.data?.message || "Failed to create employee or take time for 2s - 10s due to render cold start.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Employees</h1>

      <AlertMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      {/* Create Employee */}
      <h4>Create Employee</h4>
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

      {/* Loader */}

      {loading && <Loader />}


      {!loading && !error && employees.length === 0 && (
        <EmptyState message="No employees found or employee is fetching.." />
      )}

      {!loading && !error && employees.length > 0 && (
        <>
          <EmployeeTable
            employees={employees}
            refresh={() => fetchEmployees(page)}
            onAlert={setAlert}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default Employees;
