import { useEffect, useState } from "react";
import API from "../api/api";
import TaskCard from "../components/TaskCard";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const grouped = {
    "To Do": tasks.filter((t) => t.status === "Pending"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    Done: tasks.filter((t) => t.status === "Completed"),
  };

  return (
    <div className="page">
      <h2>Task Board</h2>
      <div className="board">
        {Object.keys(grouped).map((col) => (
          <div key={col} className="board-col">
            <h4>{col}</h4>
            {grouped[col].map((task) => (
              <TaskCard key={task._id} task={task} onUpdate={() => {}} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;