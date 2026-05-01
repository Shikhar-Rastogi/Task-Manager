// src/pages/Projects.jsx
import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaPlus, FaFolderOpen } from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
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
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>

        {user?.role === "Admin" && (
          <button
            onClick={createProject}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FaPlus />
            New Project
          </button>
        )}
      </div>

      {/* Projects List */}
      <div className="mt-6 grid gap-4">

        {projects.length > 0 ? (
          projects.map((p) => (
            <Link key={p._id} to={`/projects/${p._id}`}>
              <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <FaFolderOpen className="text-blue-500 text-xl" />
                  <h3 className="font-semibold text-gray-700">
                    {p.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
            <FaFolderOpen className="text-4xl mb-2" />
            <p>No projects yet</p>

            {user?.role === "Admin" && (
              <button
                onClick={createProject}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Create your first project
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Projects;