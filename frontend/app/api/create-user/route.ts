import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { SignUpSuccessResponse } from "@/types/auth";
import axiosInstance from "@/lib/axiosInstance";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const response = await axiosInstance.post<SignUpSuccessResponse>(
      "/auth/sign-up",
      body
    );

    const data = response.data;

    const res = NextResponse.json<SignUpSuccessResponse>(
      {
        success: true,
        message: data.message,
        data: data.data,
      },
      { status: 201 }
    );

    return res;
  } catch (error) {
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
