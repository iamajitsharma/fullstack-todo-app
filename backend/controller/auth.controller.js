import mongoose from "mongoose";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { firstName, lastName, email, role, password } = req.body;

    // Validate input BEFORE DB queries
    // if (!name || !email || !password) {
    //   return next(new Error("Name, Email and Password are required"));
    // }

    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters long");
      error.statusCode = 400;
      throw error;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      const error = new Error("User already exists with this email");
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user correctly inside transaction
    const newUser = await User.create(
      [{ firstName, lastName, email, password: hashedPassword, role }],
      { session }
    );

    const createdUser = newUser[0];

    // JWT
    const token = jwt.sign({ userId: createdUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: {
          id: createdUser._id,
          name: `${createdUser.firstName} ${createdUser.lastName}`,
          email: createdUser.email,
          role: createdUser.role,
        },
      },
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    session.endSession();
    next(error);
  }
};
