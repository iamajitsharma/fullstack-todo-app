import { Router } from "express";

const userRouters = Router();

userRouters.get("/", (req, res) => res.send("Get all user"));
userRouters.get("/:id", (req, res) => res.send("Get user by id"));

export default userRouters;
