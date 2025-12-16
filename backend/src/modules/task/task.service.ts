import type { CreateTaskInput } from "./task.types.js";
import { createTask,findTasksForUser } from "./task.repository.js";

export async function createTaskService(
  data: CreateTaskInput & { creatorId: string; assignedToId?: string }
) {
  const dueDate = new Date(data.dueDate);
  if (isNaN(dueDate.getTime())) {
    throw new Error("Invalid dueDate. Please use ISO format (e.g., '2025-12-31').");
  }

  const taskData = {
    title: data.title,
    description: data.description,
    dueDate,
    priority: data.priority,
    creatorId: data.creatorId,
    ...(data.assignedToId !== undefined && { assignedToId: data.assignedToId }),
  };

  return createTask(taskData);
}

export async function getUserTasksService(userId: string) {
  // Later: add permissions, logging, caching, etc.
  return findTasksForUser(userId);
}