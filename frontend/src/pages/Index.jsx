import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
      }}
    >
      <div className="text-center bg-dark p-5 rounded shadow">
        <h2 className="mt-3">Welcome to Hrms Attendance</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Index;