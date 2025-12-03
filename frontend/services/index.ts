"use server";
import axiosInstance from "@/lib/axiosInstance";
import { CreateTaskItem } from "@/types/task";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function getToken() {
  const cookiesInstance = await cookies();
  const token = cookiesInstance.get("token")?.value;

  if (!token) return null;

  return token;
}

export async function createTask(data: CreateTaskItem) {
  const token = await getToken();

  if (!token) redirect("/sign-in");
  try {
    const response = await axiosInstance.post("/task", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

type TaskParams = {
  pageParam?: number;
  limit?: number;
};

export async function getTasks({ pageParam = 1, limit = 5 }: TaskParams) {
  const token = await getToken();

  if (!token) redirect("/sign-in");

  // Decode server-side cookie JWT
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  const userId = (decoded as any).userId;

  if (!userId) redirect("/sign-in");

  const searchParams = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
  });

  const response = await axiosInstance.get(
    `/task/user/${userId}?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function deleteTask(id: string) {
  const token = await getToken();

  if (!token) redirect("/sign-in");

  const response = await axiosInstance.delete(`/task/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateTask(id: string, data: Partial<CreateTaskItem>) {
  const token = await getToken();
  if (!token) redirect("/sign-in");

  const response = await axiosInstance.put(`/task/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
