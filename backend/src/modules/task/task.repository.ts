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

export async function findTasksForUser(userId: string) {
  const now = new Date();

  const [assigned, created, overdue] = await Promise.all([
    prisma.task.findMany({
      where: { assignedToId: userId },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
      },
      orderBy: { dueDate: "asc" },
    }),
    prisma.task.findMany({
      where: { creatorId: userId },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
      },
      orderBy: { dueDate: "asc" },
    }),
    prisma.task.findMany({
      where: {
        OR: [{ creatorId: userId }, { assignedToId: userId }],
        dueDate: { lt: now },
      },
      include: {
        creator: { select: { id: true, name: true, email: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
      },
      orderBy: { dueDate: "asc" },
    }),
  ]);

  return { assigned, created, overdue };
}