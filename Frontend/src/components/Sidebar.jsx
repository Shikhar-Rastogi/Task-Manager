// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineTask,
} from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "My Tasks", path: "/tasks/board", icon: <MdOutlineTask /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col shadow-lg">

      {/* Logo */}
      <h2 className="text-xl font-bold mb-8 tracking-wide">
        Task Manager
      </h2>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
              ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;