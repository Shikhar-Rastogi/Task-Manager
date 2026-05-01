import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await API.post("/projects", { name, description });
    navigate("/projects");
  };

  return (
    <div className="page">
      <h2>Create Project</h2>

      <form className="form" onSubmit={handleCreate}>
        <label>Project Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <button className="btn-primary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProject;