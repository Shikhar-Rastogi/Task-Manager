// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../api/api";
import TaskCard from "../components/TaskCard";
import { FaCheckCircle, FaClock, FaExclamationTriangle } from "react-icons/fa";

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
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        {/* Completed */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <h3 className="text-2xl font-bold text-green-600">
              {completed}
            </h3>
          </div>
          <FaCheckCircle className="text-green-500 text-3xl" />
        </div>

        {/* Pending */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <h3 className="text-2xl font-bold text-yellow-600">
              {pending}
            </h3>
          </div>
          <FaClock className="text-yellow-500 text-3xl" />
        </div>

        {/* Overdue */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Overdue</p>
            <h3 className="text-2xl font-bold text-red-600">
              {overdue}
            </h3>
          </div>
          <FaExclamationTriangle className="text-red-500 text-3xl" />
        </div>

      </div>

      {/* Tasks Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          My Tasks
        </h3>

        <div className="grid gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              No tasks available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;