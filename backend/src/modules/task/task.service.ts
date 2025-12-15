import type { CreateTaskInput } from "./task.types.js";
import { createTask } from "./task.repository.js";

export async function createTaskService(
  data: CreateTaskInput & { creatorId: string; assignedToId?: string }
) {
  const dueDate = new Date(data.dueDate);
  if (isNaN(dueDate.getTime())) {
    throw new Error("Invalid dueDate. Please use ISO format (e.g., '2025-12-31').");
  }

  // Build data object conditionally
  const taskData = {
    title: data.title,
    description: data.description,
    dueDate,
    priority: data.priority,
    creatorId: data.creatorId,
    // Only include assignedToId if it's a string (not undefined)
    ...(data.assignedToId !== undefined && { assignedToId: data.assignedToId }),
  };

  return createTask(taskData);
}