import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);

  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h4 className="mb-4">HRMS</h4>

      <ul className="nav flex-column">

        {/* Dashboard */}
        <li className="nav-item">
          <Link className="nav-link text-white" to="/">
            Dashboard
          </Link>
        </li>

        {/* Employees */}
        <li className="nav-item">
          <button
            onClick={() => setEmployeeOpen(!employeeOpen)}
            className="nav-link text-white bg-dark border-0 w-100 d-flex justify-content-between align-items-center"
          >
            Employees
            <span
              style={{
                transition: "transform 0.3s",
                transform: employeeOpen ? "rotate(90deg)" : "rotate(0deg)"
              }}
            >
              ▶
            </span>
          </button>

          <div
            className="overflow-hidden"
            style={{
              maxHeight: employeeOpen ? "200px" : "0",
              transition: "max-height 0.3s ease"
            }}
          >
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <Link className="nav-link text-white" to="employees">
                  View Employees
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Attendance */}
        <li className="nav-item mt-2">
          <button
            onClick={() => setAttendanceOpen(!attendanceOpen)}
            className="nav-link text-white bg-dark border-0 w-100 d-flex justify-content-between align-items-center"
          >
            Attendance
            <span
              style={{
                transition: "transform 0.3s",
                transform: attendanceOpen ? "rotate(90deg)" : "rotate(0deg)"
              }}
            >
              ▶
            </span>
          </button>

          <div
            className="overflow-hidden"
            style={{
              maxHeight: attendanceOpen ? "200px" : "0",
              transition: "max-height 0.3s ease"
            }}
          >
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <Link className="nav-link text-white" to="attendance">
                  View Attendance
                </Link>
              </li>
             
            </ul>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
