import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import AttendanceTable from "../components/AttendanceTable";

const Attendance = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [fetchLoading, setFetchLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState("");

  const [alert, setAlert] = useState({ type: "", message: "" });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH EMPLOYEES ================= */
  const fetchEmployees = async () => {
    try {
      setFetchLoading(true);
      const res = await api.get("employee/all/");
      // console.log(res.data)
      setEmployees(res.data);
    } catch {
      setError("Failed to load employees");
    } finally {
      setFetchLoading(false);
    }
  };

  /* ================= FETCH ATTENDANCE ================= */
  const fetchAttendance = async (pageNo = 1) => {
    try {
      setFetchLoading(true);
      setError("");

      const res = await api.get(`attendance?page=${pageNo}&size=10`);
      setAttendance(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch {
      setError("Failed to load attendance records");
    } finally {
      setFetchLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAttendance(page);
  }, [page]);

  /* ================= CREATE ATTENDANCE ================= */

  const createAttendance = async () => {
    if (!employeeId || !date) {
      setAlert({ type: "warning", message: "All fields are required" });
      return;
    }

    try {

      setActionLoading(true);
      await api.post("attendance/", { employee: employeeId, date, status });

      setAlert({
        type: "success",
        message: "Attendance created successfully",
      });

      setEmployeeId("");
      setDate("");
      setStatus("Present");

      fetchAttendance(page);
    } catch (err) {
      setAlert({
        type: "danger",
        message: err.response?.data?.message || "Error creating attendance",
      });
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= DELETE ATTENDANCE ================= */
  const deleteAttendance = async (id) => {
    if (!window.confirm("Delete attendance record?")) return;

    try {
      setActionLoading(true);
      await api.delete(`attendance/${id}/`);

      setAlert({
        type: "success",
        message: "Attendance deleted successfully",
      });

      fetchAttendance(page);
    } catch {
      setAlert({
        type: "danger",
        message: "Failed to delete attendance",
      });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="mb-3">Attendance Management</h3>

      {/* ALERT */}
      <AlertMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      {/* CREATE ATTENDANCE */}
      <h4>Set Attendance</h4>
      <div className="bg-white p-4 rounded shadow mb-4  gap-3">
        <div className="row g-2">
          <div className="col-md-4">
            <select
              className="form-select p-3"
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
              className="form-control p-3"
              value={date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select p-3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-primary w-100 p-3"
              onClick={createAttendance}
              disabled={actionLoading}
            >
              {actionLoading ? "Saving..." : "Add"}
            </button>
          </div>
        </div>
      </div>

      <h4>Show Attendance</h4>

      <AttendanceTable
        attendance={attendance}
        fetchLoading={fetchLoading}
        error={error}
        hasFetched={hasFetched}
        page={page}
        totalPages={totalPages}
        onRetry={(p = page) => fetchAttendance(p)}
        onDelete={deleteAttendance}
        onView={(id) => navigate(`employee/${id}`)}
      />
    </div>
  );
};

export default Attendance;