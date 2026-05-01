// src/components/Navbar.jsx
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineAppstore } from "react-icons/ai";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLink = (path) =>
    `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white shadow-md">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* 🔥 LOGO */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg shadow">
            <AiOutlineAppstore className="text-white text-lg" />
          </div>
          <span className="font-semibold text-lg tracking-wide">
            Task Manager
          </span>
        </div>

        {user && (
          <div className="flex items-center gap-5">

            {/* Links */}
            <Link to="/dashboard" className={navLink("/dashboard")}>
              <MdDashboard />
              Dashboard
            </Link>

            <Link to="/projects" className={navLink("/projects")}>
              <FaProjectDiagram />
              Projects
            </Link>

            {/* User */}
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-xs font-bold">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm">{user.name}</span>
                <span className="text-xs text-gray-400">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm hover:bg-red-500 transition"
            >
              <FiLogOut />
              Logout
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;