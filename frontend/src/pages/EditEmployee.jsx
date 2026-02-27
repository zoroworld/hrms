import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  /* ================= FETCH EMPLOYEE ================= */
  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const res = await api.get(`employee/${id}/`);
    //   console.log(res);
      
      setForm(res.data);
    } catch {
      setAlert({ type: "danger", message: "Failed to load employee" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  /* ================= UPDATE EMPLOYEE ================= */
  const updateEmployee = async () => {
    try {
      setSaving(true);

      await api.put(`employee/${id}/`, form);

      setAlert({
        type: "success",
        message: "Employee updated successfully",
      });

      setTimeout(() => navigate("/dashboard/employees"), 1000);
    } catch (err) {
      setAlert({
        type: "danger",
        message:
          err.response?.data?.message || "Failed to update employee",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <h3>Edit Employee</h3>

      <AlertMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      <div className="card p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="First Name"
              value={form.first_name}
              onChange={(e) =>
                setForm({ ...form, first_name: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Last Name"
              value={form.last_name}
              onChange={(e) =>
                setForm({ ...form, last_name: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Department"
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            />
          </div>

          <div className="col-md-12">
            <button
              className="btn btn-primary me-2"
              onClick={updateEmployee}
              disabled={saving}
            >
              {saving ? "Updating..." : "Update"}
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;