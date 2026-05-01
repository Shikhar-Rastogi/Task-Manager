import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const CreateTask = () => {
  const { id } = useParams(); // projectId
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", {
      title,
      description,
      deadline,
      priority,
      projectId: id,
    });

    navigate(`/projects/${id}`);
  };

  return (
    <div className="page">
      <h2>Create Task</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Due Date</label>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateTask;