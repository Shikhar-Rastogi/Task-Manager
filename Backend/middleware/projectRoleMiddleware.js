import Project from "../models/Project.js";

export const checkProjectAdmin = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const member = project.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );

    if (!member || member.role !== "Admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Error checking role" });
  }
};