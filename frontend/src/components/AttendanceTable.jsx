import DataTable from "./DataTable";

const AttendanceTable = ({
  attendance,
  fetchLoading,
  error,
  hasFetched,
  page,
  totalPages,
  onRetry,
  onDelete,
  onView,
}) => {
  return (
    <DataTable
      columns={["#", "Employee", "Date", "Status", "Action"]}
      data={attendance}
      loading={fetchLoading}
      error={error}
      hasFetched={hasFetched}
      page={page}
      totalPages={totalPages}
      onPageChange={onRetry}
      onRetry={onRetry}
      renderRow={(a, index) => (
        <tr key={a.id}>
          <td>{(page - 1) * 10 + index + 1}</td>
          <td>
            {a.employee_detail?.first_name}{" "}
            {a.employee_detail?.last_name}
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
              className="btn btn-sm btn-danger me-2"
              onClick={() => onDelete(a.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onView(a.employee)}
            >
              View
            </button>
          </td>
        </tr>
      )}
    />
  );
};

export default AttendanceTable;