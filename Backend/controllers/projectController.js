import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const project = await Project.create({
    name: req.body.name,
    createdBy: req.user._id,
    members: [req.user._id],
  });

  res.json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({
    members: req.user._id,
  });

  res.json(projects);
};