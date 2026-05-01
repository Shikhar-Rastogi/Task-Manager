// src/components/TaskStatusBadge.jsx
import { FaCheckCircle, FaClock } from "react-icons/fa";

const TaskStatusBadge = ({ status }) => {
  const styles = {
    "To Do": "bg-gray-200 text-gray-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Done": "bg-green-100 text-green-700",
  };

  const icons = {
    "To Do": <FaClock className="text-gray-500" />,
    "In Progress": <FaClock className="text-yellow-500" />,
    "Done": <FaCheckCircle className="text-green-500" />,
  };

  return (
    <span
      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
};

export default TaskStatusBadge;