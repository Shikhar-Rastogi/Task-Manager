// src/pages/ProjectDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import TaskCard from "../components/TaskCard";
import useAuth from "../hooks/useAuth";

const ProjectDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  const fetchTasks = async () => {
    const { data } = await API.get(`/tasks?projectId=${id}`);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const handleUpdate = async (taskId, status) => {
    await API.patch(`/tasks/${taskId}`, { status });
    fetchTasks();
  };

  const createTask = async () => {
    const title = prompt("Task title");
    if (!title) return;

    await API.post("/tasks", {
      title,
      projectId: id,
    });

    fetchTasks();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Project Tasks</h2>

      {user?.role === "Admin" && (
        <button
          onClick={createTask}
          className="bg-green-500 text-white px-3 py-1 mt-3"
        >
          + Add Task
        </button>
      )}

      <div className="mt-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;