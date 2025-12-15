import { prisma } from "../../lib/prisma.js";

export function createTask(data: {
    title: string
    description: string
    dueDate: Date
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
    creatorId: string
    assignedToId?: string
}) {
    return prisma.task.create({
        data: {
            title: data.title,
            description:data.description,
            dueDate:data.dueDate,
            priority:data.priority,
            creatorId:data.creatorId
        }
    })
}