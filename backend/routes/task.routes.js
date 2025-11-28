import { Router } from "express";

const taskRouter = Router();

// Get Task By ID
taskRouter.get("/:id", (req, res) => {
  res.send("Get user wise all task");
});

// Delete Task - Admin
taskRouter.delete("/:id", (req, res) => {
  res.send("Delete task by id");
});

// Get User's Task List
taskRouter.get("/user/:id", (req, res) => {
  res.send("Get all user task");
});

export default taskRouter;
