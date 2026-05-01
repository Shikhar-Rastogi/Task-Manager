// src/components/TaskCard.jsx
const TaskCard = ({ task, onUpdate }) => {
  const isOverdue =
    task.deadline &&
    new Date(task.deadline) < new Date() &&
    task.status !== "Completed";

  return (
    <div className="border p-3 rounded shadow mb-2">
      <h3 className="font-bold">{task.title}</h3>

      <p>Status: {task.status}</p>

      {task.deadline && (
        <p className={isOverdue ? "text-red-500" : ""}>
          Deadline: {new Date(task.deadline).toLocaleDateString()}
        </p>
      )}

      <select
        className="mt-2"
        value={task.status}
        onChange={(e) => onUpdate(task._id, e.target.value)}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    </div>
  );
};

export default TaskCard;