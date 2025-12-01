"use client";
import { LogOut } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { logout } = useAuth();
  return (
    <div className="flex items-center justify-end gap-4 mt-3 px-6">
      <div>
        <ModeToggle />
      </div>
      <div>
        <Button variant={"ghost"} className="cursor-pointer" onClick={logout}>
          <span>
            <LogOut size={16} />
          </span>
          Logout
        </Button>
      </div>
    </div>
  );
}
