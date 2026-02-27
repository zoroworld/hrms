import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import EmployeeAttendance from "./pages/EmployeeAttendance";
import Index from "./pages/Index";
import DashboardLayout from "./pages/layout/DashboardLayout";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <Routes>
      {/* ===============Landing page===================== */}
      <Route path="/" element={<Index />} />

      {/* ===================Dashboard==================== */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Employees />} />
        <Route path="employees" element={<Employees />} />
        <Route
          path="/dashboard/employees/:id"
          element={<EditEmployee />}
        />
        <Route path="attendance" element={<Attendance />} />
        <Route
          path="attendance/employee/:id"
          element={<EmployeeAttendance />}
        />
      </Route>
    </Routes>
  );
}

export default App;
