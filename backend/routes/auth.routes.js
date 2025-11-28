import { Router } from "express";
import { signUp } from "../controller/auth.controller.js";

const authRouter = Router();

// Sign Up
authRouter.post("/sign-up", signUp);

// Sign In
authRouter.get("/sign-in", (req, res) => {
  res.send("Sign In");
});

export default authRouter;
