// src/components/StatsCard.jsx
const StatsCard = ({ label, value, color, icon }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center">

      {/* Left */}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className={`text-2xl font-bold ${color}`}>
          {value}
        </h3>
      </div>

      {/* Right Icon */}
      <div className={`text-3xl ${color}`}>
        {icon}
      </div>

    </div>
  );
};

export default StatsCard;