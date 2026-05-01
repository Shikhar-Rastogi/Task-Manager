// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../api/api";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdate = async (id, status) => {
    await API.patch(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status !== "Completed").length;
  const overdue = tasks.filter(
    t =>
      t.deadline &&
      new Date(t.deadline) < new Date() &&
      t.status !== "Completed"
  ).length;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>

      {/* Stats */}
      <div className="flex gap-4 mt-4">
        <div className="bg-green-200 p-3 rounded">✅ {completed}</div>
        <div className="bg-yellow-200 p-3 rounded">⏳ {pending}</div>
        <div className="bg-red-200 p-3 rounded">⚠️ {overdue}</div>
      </div>

      {/* Tasks */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">My Tasks</h3>

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

export default Dashboard;