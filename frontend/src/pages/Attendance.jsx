import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [message, setMessage] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    const res = await api.get("employee/");
    setEmployees(res.data);
  };

  // Fetch attendance
  const fetchAttendance = async () => {
    const res = await api.get("attendance/");
    console.log(res);
    setAttendance(res.data);
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  // Create attendance
  const createAttendance = async () => {
    if (!employeeId || !date) {
      setMessage("All fields are required");
      return;
    }

    try {
      await api.post("attendance/", {
        employee: employeeId,
        date: date,
        status: status,
      });

      setMessage("Attendance created successfully");
      setEmployeeId("");
      setDate("");
      setStatus("Present");
      fetchAttendance();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating attendance");
    }
  };

  // Delete attendance
  const deleteAttendance = async (id) => {
    if (!window.confirm("Delete attendance record?")) return;

    await api.delete(`attendance/${id}/`);
    fetchAttendance();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Attendance Management</h3>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Create Attendance */}
      <div className="card p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <select
              className="form-select"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.first_name} {emp.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="date"
              className="form-control dat-set"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]} // optional
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={createAttendance}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>
                {a.employee_detail?.first_name} {a.employee_detail?.last_name}
              </td>
              <td>{a.date}</td>
              <td>
                <span
                  className={`badge ${
                    a.status === "Present" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {a.status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteAttendance(a.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => navigate(`/attendance/employee/${a.employee}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
