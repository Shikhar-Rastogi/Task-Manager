// src/pages/CreateProject.jsx
import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { FaFolderPlus } from "react-icons/fa";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Project name is required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/projects", { name, description });

      navigate("/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaFolderPlus className="text-blue-600 text-2xl" />
          <h2 className="text-xl font-bold text-gray-800">
            Create Project
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="flex flex-col gap-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              rows="3"
              placeholder="Optional description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProject;