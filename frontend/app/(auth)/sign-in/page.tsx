//import node modules libraries
import { Metadata } from "next";

//import custom components
import SignInForm from "../components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "A todo appliction",
};

export default function Login() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-sm p-4 md:p-0 md:max-w-lg w-full">
        <SignInForm />
      </div>
    </section>
  );
}
