import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Title must be at least 3 characters long"],
      maxLength: [100, "Title must be at most 50 characters long"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["pending", "completed"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
