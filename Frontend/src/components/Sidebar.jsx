import { Link } from "react-router-dom";
import "./components.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 style={{ marginBottom: "20px" }}>Task Manager</h3>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/tasks">My Tasks</Link>
    </div>
  );
};

export default Sidebar;