import Task from "../models/Task.js";
import Project from "../models/Project.js";

// CREATE TASK (only project admin)
export const createTask = async (req, res) => {
  const { title, description, projectId, assignedTo, priority, deadline } = req.body;

  if (!projectId) {
    return res.status(400).json({ message: "projectId is required" });
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const member = project.members.find(
    (m) => m.user.toString() === req.user._id.toString()
  );

  if (!member || member.role !== "Admin") {
    return res.status(403).json({ message: "Only Admin can create tasks" });
  }

  const task = await Task.create({
    title,
    description,
    projectId,
    assignedTo,
    priority,
    deadline,
  });

  res.json(task);
};


// GET TASKS
export const getTasks = async (req, res) => {
  const { projectId } = req.query;

  // ✅ Dashboard case → no projectId
  if (!projectId) {
    const tasks = await Task.find({
      assignedTo: req.user._id,
    }).populate("assignedTo", "name email");
    return res.json(tasks);
  }

  // ✅ Project tasks
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.some(
    (m) => m.user.toString() === req.user._id.toString()
  );

  if (!isMember) {
    return res.status(403).json({ message: "Not a project member" });
  }

  const tasks = await Task.find({ projectId })
    .populate("assignedTo", "name email");

  res.json(tasks);
};


// UPDATE TASK (assigned user OR project admin)
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const project = await Project.findById(task.projectId);

  const isAdmin = project.members.some(
    (m) =>
      m.user.toString() === req.user._id.toString() &&
      m.role === "Admin"
  );

  const isAssigned =
    task.assignedTo?.toString() === req.user._id.toString();

  if (!isAssigned && !isAdmin) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};