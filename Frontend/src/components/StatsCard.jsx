const StatsCard = ({ label, value, color }) => {
  return (
    <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
      <p className="muted">{label}</p>
      <h3>{value}</h3>
    </div>
  );
};

export default StatsCard;