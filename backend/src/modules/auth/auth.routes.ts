// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { signup, login } from "./auth.service.js";
import { prisma } from "../../lib/prisma.js";
import jwt from "jsonwebtoken";
import { requireAuth } from "../../middlewares/requireAuth.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await signup(req.body);
    res.status(201).json({
      message:"signup successful. please login",
      user
    })

  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body);
    res
      .cookie("token", result.token, { httpOnly: true, secure: false })
      .json({ user: { id: result.user.id, name: result.user.name, email: result.user.email } });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
