import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [3, "First must be at least 3 characters long"],
      maxLength: [30, "First must be at most 50 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minLength: [3, "Last name must be at least 3 characters long"],
      maxLength: [30, "Last name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email ID is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    role: {
      type: String,
      enum: ["normal", "admin"],
      required: [true, , "You must provide normal/admin as role"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
