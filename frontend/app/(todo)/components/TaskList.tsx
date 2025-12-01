"use client";
import { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdddTaskForm from "./AddTaskForm";
import { Pencil, Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Props = {};

export default function TaskList({}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <Fragment>
      <Card className="overflow-hidden">
        <CardContent className="h-full flex flex-col w-full">
          <CardHeader className="flex items-center justify-between border-b py-2 px-0">
            <div className="text-xl font-semibold">
              <h4>Task List</h4>
            </div>
            <Button onClick={handleOpen}>Add Task</Button>
          </CardHeader>

          <ScrollArea className="flex-1 overflow-y-auto pr-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <TaskItem key={index} />
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <AdddTaskForm isOpen={isOpen} onClose={handleClose} />
    </Fragment>
  );
}

function TaskItem() {
  const { user } = useAuth();
  console.log(user, "User");
  return (
    <div className="group my-5 flex rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Elegant Date Bar */}
      <div
        className="
        w-28 
        bg-gradient-to-b from-neutral-800 to-neutral-900 
        text-white 
        flex flex-col items-center justify-center
        py-5
        self-stretch     /* 🔥 Forces full height */
      "
      >
        <p className="text-sm opacity-80 tracking-wide">AUG</p>
        <p className="text-5xl font-extrabold leading-none">05</p>
        <p className="text-sm opacity-80 tracking-wide">2025</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between px-5 py-4">
        {/* Title */}
        <h2 className="text-base font-semibold text-neutral-800 leading-snug mb-1">
          Title of the task goes here for testing purposes
        </h2>

        {/* Description */}
        <p className="text-xs text-neutral-500 line-clamp-2 mb-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quia
          voluptatum nemo.
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-1">
          {/* Creator */}
          <div className="text-xs bg-neutral-100 px-3 py-1 rounded-full text-neutral-600">
            <span className="opacity-75">Created by</span>:
            <span className="font-medium ml-1">Ajit Sharma</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button className="w-9 h-9 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all">
              <Pencil size={17} />
            </Button>

            {user?.role === "admin" && (
              <Button className="w-9 h-9 bg-red-50 text-red-600 rounded-full flex items-center justify-center hover:bg-red-100 transition-all">
                <Trash size={17} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
