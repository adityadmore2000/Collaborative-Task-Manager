import { Router } from "express";
import { createTaskService } from "./task.service.js";
import { requireAuth } from "../../middlewares/requireAuth.js";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const { title, description, dueDate, priority, assignedToId } = req.body;

  // Basic validation
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
      creatorId: req.user.id, // ✅ safe now!
      assignedToId,
    });

    return res.status(201).json(task);
  } catch (error: any) {
    console.error("Create task error:", error);
    return res.status(400).json({ error: error.message || "Failed to create task" });
  }
});

export default router;