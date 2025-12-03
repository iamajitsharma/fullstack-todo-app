"use client";
//import node modules libraries
import { useState, Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

//import shadcn ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

//import custom components
import AddUpdateTaskForm from "./AddUpdateTaskForm";
import { TaskItem } from "./TaskItem";

//import custom hooks
import useTask from "@/hooks/useTask";

export default function TaskList() {
  const {
    taskItems,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    handleAddTaskModal,
  } = useTask();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Fragment>
      <Card className="overflow-hidden h-full max-w-xl w-full mx-auto">
        <CardContent className="flex flex-col h-full p-0">
          <CardHeader className="flex items-center justify-between border-b py-2 px-4">
            <h4 className="text-xl font-semibold">Task List</h4>
            <Button onClick={handleAddTaskModal} className="cursor-pointer">
              Add Task
            </Button>
          </CardHeader>

          <p> {isFetchingNextPage && "Fetcing"}</p>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1 overflow-y-auto px-4">
            {taskItems.map((item) => (
              <TaskItem key={item._id} task={item} />
            ))}
            <div ref={ref} className="h-10" />
          </ScrollArea>
        </CardContent>
      </Card>
      <AddUpdateTaskForm />
    </Fragment>
  );
}
