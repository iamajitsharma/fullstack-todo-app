import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js";
import userRouters from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(arcjetMiddleware);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouters);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
  await connectDB();
});

export default app;
