export type CreateTaskItem = {
  title: string;
  desc: string;
  status: "pending" | "completed";
};

export type Task = {
  _id: string;
  title: string;
  desc: string;
  status: "pending" | "completed";
  user: string;
  createdAt: string;
  updatedAt: string;
};
