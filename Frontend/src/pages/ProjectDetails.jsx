// src/pages/ProjectDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import TaskCard from "../components/TaskCard";
import MemberList from "../components/MemberList";
import useAuth from "../hooks/useAuth";

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    const { data } = await API.get(`/projects/${id}`);
    setProject(data);
  };

  const fetchTasks = async () => {
    const { data } = await API.get(`/tasks?projectId=${id}`);
    setTasks(data);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchProject();
      await fetchTasks();
      setLoading(false);
    };
    load();
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
      priority: "Medium",
    });

    fetchTasks();
  };

  const isAdmin =
    project?.members?.some(
      (m) =>
        m.user._id.toString() === user._id.toString() &&
        m.role === "Admin"
    ) || false;

  const handleRemoveMember = async (userId) => {
    await API.post(`/projects/${id}/remove-member`, { userId });
    fetchProject();
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!project) return <div className="p-6 text-red-500">Not found</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{project.name}</h2>

        {isAdmin && (
          <button
            onClick={createTask}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Task
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Members */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Members</h3>

            <Link
              to={`/projects/${id}/members`}
              className="text-blue-600 text-sm"
            >
              Manage
            </Link>
          </div>

          <MemberList
            members={project.members.map((m) => m.user)}
            onRemove={isAdmin ? handleRemoveMember : null}
          />
        </div>

        {/* Tasks */}
        <div className="md:col-span-2 bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Tasks</h3>

          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <p>No tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;