import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  addMember,
  removeMember,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";
import { checkProjectAdmin } from "../middleware/projectRoleMiddleware.js";

const router = express.Router();

// CREATE PROJECT
router.post("/", protect, createProject);

// GET ALL PROJECTS
router.get("/", protect, getProjects);

// GET SINGLE PROJECT
router.get("/:id", protect, getProjectById);

// ADD MEMBER (Admin only)
router.post("/:id/add-member", protect, checkProjectAdmin, addMember);

// REMOVE MEMBER (Admin only)
router.post("/:id/remove-member", protect, checkProjectAdmin, removeMember);

export default router;