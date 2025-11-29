import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getUserTask,
} from "../controller/task.controller.js";
import authorizedMiddleware from "../middlewares/auth.middleware.js";

const taskRouter = Router();

// Get Task By ID
taskRouter.post("/", authorizedMiddleware, createTask);

// Get User's Task List
taskRouter.get("/user/:id", authorizedMiddleware, getUserTask);

taskRouter.get("/", authorizedMiddleware, getAllTask);

// Delete Task - Admin
taskRouter.delete("/:id", authorizedMiddleware, deleteTask);

export default taskRouter;
