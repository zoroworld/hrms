import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={styles.container}>
      {/* Previous */}
      <button
        style={styles.button}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          style={{
            ...styles.button,
            ...(page === p ? styles.active : {}),
          }}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        style={styles.button}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
    gap: "6px",
  },
  button: {
    padding: "6px 12px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    borderRadius: "4px",
    color:"#333",
  },
  active: {
    background: "#4f46e5",
    color: "#fff",
    borderColor: "#4f46e5",
  },
};

export default Pagination;