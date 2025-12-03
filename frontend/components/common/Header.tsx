"use client";
//import node modules libraries
import { LogOut } from "lucide-react";

//import custom components
import { ModeToggle } from "./ModeToggle";

//import shadcn ui components
import { Button } from "../ui/button";

//import custom hooks
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center justify-end gap-4 px-6 h-12">
      <ModeToggle />
      {user && (
        <Button variant={"ghost"} className="cursor-pointer" onClick={logout}>
          <span>
            <LogOut size={16} />
          </span>
          Logout
        </Button>
      )}
    </div>
  );
}
