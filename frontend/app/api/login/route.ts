import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axiosInstance.post("/auth/sign-in", body);

    const data = response.data;

    console.log(data, "Before return response");

    const res = NextResponse.json({
      user: data.data.user,
      message: data.message,
    });

    if (data.data.token) {
      res.cookies.set("token", data.data.token, { httpOnly: true });
    }

    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data, "Axios Error");

      return NextResponse.json(
        {
          user: null,
          message: error.response?.data?.error || "Something went wrong",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        user: null,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
