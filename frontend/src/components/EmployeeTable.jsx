import { useState } from "react";
import api from "../api/api";
import DataTable from "./DataTable";

const EmployeeTable = ({ employees, refresh, onAlert }) => {
  const [deletingId, setDeletingId] = useState(null);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      setDeletingId(id);
      await api.delete(`employee/${id}/`);

      onAlert?.({
        type: "warning",
        message: "Employee deleted successfully",
      });

      refresh?.();
    } catch (err) {
      onAlert?.({
        type: "danger",
        message:
          err.response?.data?.message || "Failed to delete employee",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <DataTable
      columns={["ID", "Name", "Email", "Department", "Actions"]}
      data={employees}
      renderRow={(emp) => (
        <tr key={emp.id}>
          <td>{emp.id}</td>
          <td>
            {capitalize(emp.first_name)} {capitalize(emp.last_name)}
          </td>
          <td>{emp.email}</td>
          <td>{emp.department}</td>
          <td>
            {/* <button className="btn btn-sm btn-primary me-2" disabled>
              Edit
            </button> */}

            <button
              className="btn btn-sm btn-danger"
              disabled={deletingId === emp.id}
              onClick={() => deleteEmployee(emp.id)}
            >
              {deletingId === emp.id ? "Deleting..." : "Delete"}
            </button>
          </td>
        </tr>
      )}
    />
  );
};

export default EmployeeTable;