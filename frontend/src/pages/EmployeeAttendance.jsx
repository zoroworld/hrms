import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import DataTable from "../components/DataTable";

const EmployeeAttendance = () => {
  const { id } = useParams();

  const [records, setRecords] = useState([]);
  const [employee, setEmployee] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`attendance/employee/${id}/`);
      const data = res.data.data || [];

      setRecords(data);

      if (data.length > 0) {
        setEmployee(data[0].employee_detail);
      }
    } catch {
      setError("Error fetching attendance");
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [id]);

  const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="container mt-4">
      <h3>
        Attendance Records for{" "}
        {employee && (
          <span className="text-primary">
            {capitalize(employee.first_name)}{" "}
            {capitalize(employee.last_name)}
          </span>
        )}
      </h3>

      <Link to="/dashboard/attendance" className="btn btn-secondary mb-3">
        Back
      </Link>

      <DataTable
        columns={["#", "Date", "Status"]}
        data={records}
        loading={loading}
        error={error}
        hasFetched={hasFetched}
        onRetry={fetchAttendance}
        renderRow={(r, index) => (
          <tr key={r.id}>
            <td>{index + 1}</td>
            <td>{r.date}</td>
            <td>
              <span
                className={`badge ${
                  r.status === "Present"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {capitalize(r.status)}
              </span>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default EmployeeAttendance;