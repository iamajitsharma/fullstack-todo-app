import Task from "../models/task.model.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const getUserTask = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }
    const task = await Task.find({ user: req.params.id });

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    //Check for admin role
    const user = req.user;

    // Role check
    if (user.role !== "admin") {
      const error = new Error("You are not authorized to delete tasks");
      error.statusCode = 403;
      throw error;
    }

    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    // Check admin user
    const user = req.user;

    // Role check
    if (user.role !== "admin") {
      const error = new Error("You are not authorized to delete tasks");
      error.statusCode = 403;
      throw error;
    }

    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    await Task.deleteOne({ _id: taskId });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
