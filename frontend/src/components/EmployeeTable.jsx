import { useState } from "react";
import api from "../api/api";

const EmployeeTable = ({ employees, refresh, onAlert }) => {
  const [deletingId, setDeletingId] = useState(null);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await api.delete(`employee/${id}/`);

      onAlert?.({
        type: "warning",
        message: "Employee deleted successfully",
      });

      refresh?.(); // safe call
    } catch (error) {
      onAlert?.({
        type: "danger",
        message:
          error.response?.data?.message || "Failed to delete employee",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const capitalizeFirst = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <table className="table table-bordered table-hover bg-white">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th style={{ width: "160px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>
              {capitalizeFirst(emp.first_name)}{" "}
              {capitalizeFirst(emp.last_name)}
            </td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              <button
                className="btn btn-sm btn-primary me-2"
                disabled
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                disabled={deletingId === emp.id}
                onClick={() => deleteEmployee(emp.id)}
              >
                {deletingId === emp.id ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;