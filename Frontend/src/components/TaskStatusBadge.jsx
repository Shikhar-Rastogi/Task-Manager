const TaskStatusBadge = ({ status }) => {
  const map = {
    Pending: "status-todo",
    "In Progress": "status-progress",
    Completed: "status-done",
  };

  return <span className={`task-status ${map[status]}`}>{status}</span>;
};

export default TaskStatusBadge;