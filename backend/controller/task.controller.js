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

export const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    // Permission check
    if (
      task.user.toString() !== req.user.id &&
      task.user.toString() !== req.user._id
    ) {
      const error = new Error("You are not the owner of this task");
      error.statusCode = 401;
      throw error;
    }

    // Whitelist fields
    const allowedUpdates = ["title", "status", "desc"];
    Object.keys(updatedData).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        task[key] = updatedData[key];
      }
    });

    await task.save();

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const getUserTask = async (req, res, next) => {
  try {
    // Permission check
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    // Pagination Params
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    // Prevent negative values
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    // Get total count (for pagination metadata)
    const totalTasks = await Task.countDocuments({ user: req.params.id });

    // Fetch paginated tasks
    const tasks = await Task.find({ user: req.params.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalTasks,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      data: tasks,
    });
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
