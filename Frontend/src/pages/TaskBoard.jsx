// src/pages/TaskBoard.jsx
import { useEffect, useState } from "react";
import API from "../api/api";
import TaskCard from "../components/TaskCard";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Update status
  const handleUpdate = async (id, status) => {
    await API.patch(`/tasks/${id}`, { status });
    fetchTasks();
  };

  // ✅ Correct grouping
  const grouped = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    "Done": tasks.filter((t) => t.status === "Done"),
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Task Board
      </h2>

      {/* Board */}
      <div className="grid md:grid-cols-3 gap-6">

        {Object.keys(grouped).map((col) => (
          <div
            key={col}
            className="bg-gray-50 p-4 rounded-xl shadow"
          >
            {/* Column Title */}
            <h3 className="font-semibold text-gray-700 mb-4">
              {col}
            </h3>

            {/* Tasks */}
            <div className="space-y-3">
              {grouped[col].length > 0 ? (
                grouped[col].map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={handleUpdate}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  No tasks
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;