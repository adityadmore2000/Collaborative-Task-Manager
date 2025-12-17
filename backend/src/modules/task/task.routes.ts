import { Router } from "express";
import { createTaskService, getUserTasksService } from "./task.service.js";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { emitTaskUpdated } from "./task.repository.js";
import {io} from "../../lib/socket.js";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const { title, description, dueDate, priority, assignedToId } = req.body;

  if (!title || !dueDate || !priority) {
    return res.status(400).json({
      error: "Missing required fields: title, dueDate, and priority are required",
    });
  }

  if (!["LOW", "MEDIUM", "HIGH", "URGENT"].includes(priority)) {
    return res.status(400).json({ error: "Invalid priority value" });
  }

  try {
    const task = await createTaskService({
      title,
      description: description || "",
      dueDate,
      priority,
      creatorId: req.user.id,
      assignedToId,
    });
    emitTaskUpdated(task);
    if (task.assignedToId) {
      io.to(task.assignedToId).emit("task:assigned", task);
    }
    return res.status(201).json(task);
  } catch (error: any) {
    console.error("Create task error:", error);
    return res.status(400).json({ error: error.message || "Failed to create task" });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const data = await getUserTasksService(req.user.id);
    return res.json({
      assignedToMe: data.assigned,
      createdByMe: data.created,
      overdue: data.overdue,
    });
  } catch (error) {
    console.error("Fetch tasks error:", error);
    return res.status(500).json({ error: "Failed to load tasks" });
  }
});

export default router;