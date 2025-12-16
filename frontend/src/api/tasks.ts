import { api } from "../lib/api";

export type CreateTaskInput = {
  title: string;
  description: string;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  assignedToId?: string;
};

export const createTask = (data: CreateTaskInput) => {
  return api.post("/tasks", data).then(res => res.data);
};