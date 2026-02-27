import { useNavigate } from "react-router-dom";
// import image from "./image.png";

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
      <div className="text-center bg-white p-5 rounded shadow">
        {/* <img src={image} alt="Welcome" style={{ width: 250 }} /> */}
        <h2 className="mt-3">Welcome To HRMS</h2>
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