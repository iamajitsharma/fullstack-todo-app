import { Metadata } from "next";
import SignUpForm from "../components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "A todo appliction",
};

export default function SignUp() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-sm p-4 md:p-0 md:max-w-lg w-full">
        <SignUpForm />
      </div>
    </section>
  );
}
