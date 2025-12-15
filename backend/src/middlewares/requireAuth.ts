import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ user: null });
    }

    const secret = process.env.JWT_SECRET!;
    const payload = jwt.verify(token, secret) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return res.status(401).json({ user: null });
    }

    // attach user to request
    (req as any).user = user;

    next();
  } catch {
    return res.status(401).json({ user: null });
  }
}
