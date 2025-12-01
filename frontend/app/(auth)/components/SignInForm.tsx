"use client";
import { useState } from "react";
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
import Link from "next/link";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const schema = z.object({
  email: z.email("Please enter the valid email"),
  password: z
    .string("Please enter the password")
    .min(6, "Password must be minimum 6 length")
    .refine((val) => !/\s/.test(val), {
      message: "Password cannot contain spaces",
    }),
});

type FormValues = z.infer<typeof schema>;

export default function SignInForm() {
  const [isShowPwd, setShowPwd] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  const { login } = useAuth();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    const result = await login(data.email, data.password);

    if (!result.success) {
      setIsError(true);
      setErrorMsg(result.message);

      return;
    }

    setIsError(false);
    setErrorMsg(null);
    router.push("/todo");
  };

  const toggleShowPassword = () => {
    setShowPwd((prev) => !prev);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>We’re glad to see you again.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Error Block */}
        {isError && (
          <Alert variant="destructive" className="my-3">
            <AlertCircleIcon />
            <AlertTitle className="font-normal text-sm">{errorMsg}</AlertTitle>
          </Alert>
        )}

        <form onSubmit={handleSubmit(submitHandler)}>
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                placeholder="Email ID"
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
                  id="password"
                  className="h-12"
                  type={isShowPwd ? "text" : "password"}
                  autoComplete="false"
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
              {isSubmitting ? "Signing in, please wait..." : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
