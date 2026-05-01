// src/pages/Projects.jsx
import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    const name = prompt("Enter project name");
    if (!name) return;

    await API.post("/projects", { name });
    fetchProjects();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Projects</h2>

      {user?.role === "Admin" && (
        <button
          onClick={createProject}
          className="bg-blue-500 text-white px-3 py-1 mt-3"
        >
          + New Project
        </button>
      )}

      <div className="mt-4">
        {projects.map((p) => (
          <Link key={p._id} to={`/projects/${p._id}`}>
            <div className="border p-3 mb-2 hover:bg-gray-100">
              {p.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;