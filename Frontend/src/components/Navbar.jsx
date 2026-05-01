// src/components/Navbar.jsx
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="font-bold">Project Manager</h1>

      {user && (
        <div className="flex gap-4 items-center">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <span className="text-sm bg-gray-600 px-2 py-1 rounded">
            {user.role}
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;