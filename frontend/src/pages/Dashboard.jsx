import { Users, CalendarCheck } from "lucide-react";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Employees"
          value="25"
          icon={<Users />}
        />
        <StatCard
          title="Today Attendance"
          value="18"
          icon={<CalendarCheck />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
