"use client";
//import node modules libraries
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

//import shadcn ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

//import custom types
import { SignUpErrorResponse, SignUpSuccessResponse } from "@/types/auth";

//import custom components
import ErrorMessage from "@/components/common/ErrorMessage";

const schema = z.object({
  firstName: z
    .string()
    .min(3, "Please enter first name")
    .max(50, "Max 50 character allowed"),
  lastName: z
    .string()
    .min(3, "Please enter last name")
    .max(50, "Max 50 character allowed"),
  email: z.email("Please enter the valid email"),
  password: z
    .string("Please enter the password")
    .min(6, "Password must be minimum 6 length")
    .refine((val) => !/\s/.test(val), {
      message: "Password cannot contain spaces",
    }),
});

type FormValues = z.infer<typeof schema>;

export default function SignUpForm() {
  const [isShowPwd, setShowPwd] = useState<boolean>(false);
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPwd((prev) => !prev);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createUser = useMutation<
    SignUpSuccessResponse,
    AxiosError<SignUpErrorResponse>,
    FormValues & { role: string }
  >({
    mutationFn: async (data) => {
      const response = await axios.post<SignUpSuccessResponse>(
        "/api/create-user",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      router.push("/sign-in");
    },
    onError: (error) => {
      console.log("Error:", error.response?.data?.message);
    },
  });

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    const payload = { ...data, role: "normal" };
    createUser.mutate(payload);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Create an account to get started.</CardTitle>
        <CardDescription>It only takes a moment!</CardDescription>
      </CardHeader>
      <CardContent>
        {createUser.isError && (
          <Alert variant="destructive" className="my-3">
            <AlertCircleIcon />
            <AlertTitle className="font-normal text-sm">
              {createUser.error?.response?.data?.message}
            </AlertTitle>
          </Alert>
        )}

        <form onSubmit={handleSubmit(submitHandler)}>
          <FieldGroup className="gap-2 md:flex-row md:gap-3">
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input
                placeholder="First Name"
                id="firstName"
                className="h-12"
                autoComplete="false"
                {...register("firstName")}
              />
              {errors.firstName && errors?.firstName?.message && (
                <ErrorMessage message={errors?.firstName?.message} />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                placeholder="Last Name"
                id="lastName"
                className="h-12"
                autoComplete="false"
                {...register("lastName")}
              />
              {errors.lastName && errors?.lastName?.message && (
                <ErrorMessage message={errors?.lastName?.message} />
              )}
            </Field>
          </FieldGroup>
          <FieldGroup className="gap-3 pt-3">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                placeholder="Email"
                id="email"
                className="h-12"
                autoComplete="false"
                {...register("email")}
              />
              {errors.email && errors?.email?.message && (
                <ErrorMessage message={errors?.email?.message} />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input
                  placeholder="Password"
                  type={isShowPwd ? "text" : "password"}
                  id="password"
                  autoComplete="false"
                  className="h-12"
                  {...register("password")}
                />
                <span
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {isShowPwd ? <Eye size={16} /> : <EyeOff size={16} />}
                </span>
              </div>

              {errors.password && errors?.password?.message && (
                <ErrorMessage message={errors?.password?.message} />
              )}
            </Field>
          </FieldGroup>
          <div className="pt-6">
            <Button className="w-full py-5" type="submit">
              {createUser.isPending ? "Creating your account..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
