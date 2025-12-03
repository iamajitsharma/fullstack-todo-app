//import node modules libraries
import { Pencil, Trash } from "lucide-react";
import { formatDate, getDay, getYear } from "date-fns";

//import shadcn ui components
import { Button } from "@/components/ui/button";

//import custom components
import { StatusBadge, TaskStatus } from "./StatusBadge";

//import custom types
import type { Task } from "@/types/task";

//import custom hooks
import { useAuth } from "@/context/AuthContext";
import useTask from "@/hooks/useTask";

export function TaskItem({ task }: { task: Task }) {
  const { user } = useAuth();

  const { deleteTaskItem, handleUpdateTaskModal } = useTask();

  const createdDate = new Date(task.createdAt);

  return (
    <div className="group my-5 flex rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Elegant Date Bar */}
      <div
        className="
        w-28 
       bg-linear-to-b from-neutral-800 to-neutral-900 
        text-white 
        flex flex-col items-center justify-center
        py-5
        self-stretch     /* 🔥 Forces full height */
      "
      >
        <p className="text-sm opacity-80 tracking-wide">
          {formatDate(createdDate, "LLL")}
        </p>
        <p className="text-5xl font-extrabold leading-none">
          {getDay(createdDate)}
        </p>
        <p className="text-sm opacity-80 tracking-wide">
          {getYear(createdDate)}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between px-5 py-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-neutral-800 leading-snug mb-1">
            {task.title}
          </h2>
          <StatusBadge status={task.status as TaskStatus} />
        </div>

        {/* Description */}
        <p className="text-xs text-neutral-500 line-clamp-2 mb-3">
          {task.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-1">
          {/* Creator */}
          <div className="text-xs bg-neutral-100 px-3 py-1 rounded-full text-neutral-600">
            <span className="opacity-75">Updated at</span>:
            <span className="font-medium ml-1">
              {formatDate(new Date(task.updatedAt), "d-MMM-yyyy")}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleUpdateTaskModal(task)}
              className="w-9 h-9 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all"
            >
              <Pencil size={17} />
            </Button>

            {user?.role === "admin" && (
              <Button
                onClick={() => deleteTaskItem(task._id)}
                className="cursor-pointer w-9 h-9 bg-red-50 text-red-600 rounded-full flex items-center justify-center hover:bg-red-100 transition-all"
              >
                <Trash size={17} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
