// src/pages/Dashboard.jsx
import { useEffect, useState, useMemo } from "react";
import API from "../api/api";
import TaskCard from "../components/TaskCard";
import StatsCard from "../components/StatsCard";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaTasks,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await API.patch(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // ✅ Only user's tasks (consistent UX)
  const myTasks = useMemo(
    () => tasks.filter((t) => t.assignedTo?._id === user?._id),
    [tasks, user]
  );

  // ✅ Stats based on MY tasks (important fix)
  const stats = useMemo(() => {
    const done = myTasks.filter((t) => t.status === "Done").length;
    const inProgress = myTasks.filter(
      (t) => t.status === "In Progress"
    ).length;
    const todo = myTasks.filter((t) => t.status === "To Do").length;

    const overdue = myTasks.filter(
      (t) =>
        t.deadline &&
        new Date(t.deadline) < new Date() &&
        t.status !== "Done"
    ).length;

    return {
      total: myTasks.length,
      done,
      inProgress,
      todo,
      overdue,
    };
  }, [myTasks]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Overview of your assigned tasks
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <StatsCard
          label="Total Tasks"
          value={stats.total}
          color="text-blue-600"
          icon={<FaTasks />}
        />

        <StatsCard
          label="To Do"
          value={stats.todo}
          color="text-gray-700"
          icon={<FaClock />}
        />

        <StatsCard
          label="In Progress"
          value={stats.inProgress}
          color="text-yellow-600"
          icon={<FaClock />}
        />

        <StatsCard
          label="Done"
          value={stats.done}
          color="text-green-600"
          icon={<FaCheckCircle />}
        />

      </div>

      {/* Overdue */}
      <div className="mt-6">
        <StatsCard
          label="Overdue Tasks"
          value={stats.overdue}
          color="text-red-600"
          icon={<FaExclamationTriangle />}
        />
      </div>

      {/* Tasks */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          My Tasks
        </h3>

        <div className="grid gap-4">
          {myTasks.length > 0 ? (
            myTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
              No tasks assigned yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;