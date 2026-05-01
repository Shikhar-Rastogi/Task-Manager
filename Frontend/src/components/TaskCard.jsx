// src/components/TaskCard.jsx
import { FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";

const TaskCard = ({ task, onUpdate }) => {
  const isOverdue =
    task.deadline &&
    new Date(task.deadline) < new Date() &&
    task.status !== "Done";

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-600";
      case "In Progress":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Done":
        return <FaCheckCircle className="text-green-500" />;
      case "In Progress":
        return <FaClock className="text-yellow-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition mb-3">

      {/* Title + Status */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">
          {task.title}
        </h3>

        <span
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${getStatusColor(task.status)}`}
        >
          {getStatusIcon(task.status)}
          {task.status}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-500 mt-1">
          {task.description}
        </p>
      )}

      {/* Deadline */}
      {task.deadline && (
        <p
          className={`flex items-center gap-2 text-sm mt-2 ${
            isOverdue ? "text-red-500 font-semibold" : "text-gray-500"
          }`}
        >
          <FaCalendarAlt />
          {new Date(task.deadline).toLocaleDateString()}
        </p>
      )}

      {/* Status Dropdown */}
      <select
        className="mt-3 w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={task.status}
        onChange={(e) => onUpdate(task._id, e.target.value)}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default TaskCard;