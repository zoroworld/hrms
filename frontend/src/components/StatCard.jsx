const StatCard = ({ title, value, icon }) => {
    return (
      <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-blue-600">
          {icon}
        </div>
      </div>
    );
  };
  
  export default StatCard;
  