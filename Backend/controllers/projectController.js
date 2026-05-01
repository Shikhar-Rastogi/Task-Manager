import Project from "../models/Project.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members: [
        {
          user: req.user._id,
          role: "Admin",
        },
      ],
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
};

// GET ALL USER PROJECTS
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      "members.user": req.user._id,
    }).populate("members.user", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// GET SINGLE PROJECT
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("members.user", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project" });
  }
};

// ADD MEMBER
export const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const exists = project.members.some(
      (m) => m.user.toString() === userId
    );

    if (exists) {
      return res.status(400).json({ message: "User already a member" });
    }

    project.members.push({
      user: userId,
      role: "Member",
    });

    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error adding member" });
  }
};

// REMOVE MEMBER (cannot remove Admin)
export const removeMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.members = project.members.filter((m) => {
      return !(
        m.user.toString() === userId &&
        m.role === "Admin"
      );
    });

    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error removing member" });
  }
};