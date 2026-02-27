import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

const EmployeeAttendance = () => {
  const { id } = useParams(); // employee ID from URL
  const [records, setRecords] = useState([]);
  const [employee, setEmployee] = useState(null);

  const [message, setMessage] = useState("");

  // Fetch employee attendance
  const fetchAttendance = async () => {
    try {
      const res = await api.get(`attendance/employee/${id}/`);
      // console.log(res.data.data)
      setRecords(res.data.data);

      // Also get employee name from first record if exists
      if (res.data.data.length > 0) setEmployee(res.data.data[0].employee_detail);
    } catch (err) {
      setMessage("Error fetching attendance");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [id]);

  const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  return (
    <div className="container mt-4">

      <h3>
        Attendance Records{" "}for{" "}
        {employee && <span className="text-primary">{`${capitalize(employee.first_name)} ${capitalize(employee.last_name)}`} </span>}
      </h3>

      <Link to="/dashboard/attendance" className="btn btn-secondary mb-3">
        Back
      </Link>

      {message && <div className="alert alert-danger">{message}</div>}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r, index) => (
            <tr key={r.id}>
              <td>{index + 1}</td>
              <td>{r.date}</td>
              <td>
                <span
                  className={`badge ${r.status === "Present" ? "bg-success" : "bg-danger"
                    }`}
                >
                  {capitalize(r.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAttendance;
