import express, { Request, Response } from "express";
import { auth } from "../utils/auth";
import { APIError } from "better-auth/api";


const router = express.Router();

// ✅ SIGN-UP ROUTE
router.post("/sign-up", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  try {
    const data = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    res.status(201).json({
      message: "User created successfully",
      user: data
    });
  } catch (error: any) {
    if (error instanceof APIError) {
      console.error(`[Better Auth Error] ${Number(error.status)}: ${error.message}`);
      return res.status(Number(error.status) || 400).json({ error: error.message });
    }

    console.error("Unexpected error during sign-up:", error);
    res.status(500).json({ error: "Internal server error during sign-up" });
  }
});

// ✅ SIGN-IN ROUTE
router.post("/sign-in", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const data = await auth.api.signInEmail({
      body: { email, password },
    });

    res.status(200  ).json({
      message: "User signed in successfully",
      user: data,
      
      
      
    });
  } catch (error: any) {
    if (error instanceof APIError) {
      console.error(`[Better Auth Error] ${error.message}, ${error.status}`);
      return res.status(Number(error.status) || 400).json({ error: error.message });
    }

    console.error("Unexpected error during sign-in:", error);
    res.status(500).json({ error: "Internal server error during sign-in" });
  }
});


//sign out
// router.post("/sign-out", async (req: Request, res: Response) => {

// })



export default router;
