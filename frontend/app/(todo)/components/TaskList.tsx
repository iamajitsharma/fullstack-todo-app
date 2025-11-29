"use client";
import { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdddTaskForm from "./AddTaskForm";
import { Pencil, Trash } from "lucide-react";

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
  return (
    <div className="my-3 flex items-center bg-white drop-shadow-sm rounded-md overflow-hidden border">
      <div className="w-1/5 bg-neutral-600 p-2">
        <div className="flex items-center justify-center flex-col text-sm font-semibold text-white">
          <p>Aug</p>
          <p className="text-3xl font-bold">5</p>
          <p>2025</p>
        </div>
      </div>
      <div className="flex-1 px-4">
        <div className="flex items-center justify-between pb-1">
          <h2>title of the task</h2>
          <div className="flex items-center gap-4 ">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
              <Pencil size={16} />
            </span>
            <span className="w-8 h-8 bg-red-100 text-red-600 flex items-center justify-center rounded-full">
              <Trash size={16} />
            </span>
          </div>
        </div>
        <p className="text-sm pt-1 line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quia
          voluptatum, nemo
        </p>
      </div>
    </div>
  );
}
