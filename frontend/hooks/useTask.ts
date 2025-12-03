//import node modules libraries
import { createTask, deleteTask, getTasks, updateTask } from "@/services";
import { CreateTaskItem, Task } from "@/types/task";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// import redux store hooks and actions
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setSelectedTask, setIsTaskModalOpen } from "@/store/slices/todoSlice";

export default function useTask() {
  const dispatch = useAppDispatch();

  const isTaskModalOpen = useAppSelector((state) => state.todo.isTaskModalOpen);

  const handleAddTaskModal = () => {
    dispatch(setSelectedTask(null));
    dispatch(setIsTaskModalOpen(true));
  };

  const handleUpdateTaskModal = (task: Task) => {
    dispatch(setSelectedTask(task));
    dispatch(setIsTaskModalOpen(true));
  };

  const handleCloseTaskModal = () => {
    dispatch(setSelectedTask(null));
    dispatch(setIsTaskModalOpen(false));
  };

  // Get Task List
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  // Create Task
  const { mutate: addTask, isPending: isCreatingTask } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      refetch();
      toast.success("Task Created Successfully", { position: "bottom-right" });
      handleCloseTaskModal();
    },
    onError: (error) => {
      console.log("Error creating task", error);
      toast.error("Error creating task", { position: "bottom-right" });
    },
  });

  const taskItems: Task[] = data?.pages.flatMap((page) => page.data) ?? [];

  // Delete Task
  const { mutate: deleteTaskItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      console.log("Item Deleted ");
      refetch();
      toast.success("Task Deleted Successfully", { position: "bottom-right" });
    },
    onError: (error) => {
      console.log("Error deleting task", error);
      toast.error("Error deleting task", { position: "bottom-right" });
    },
  });

  // Update Task
  const { mutate: updaetTaskItem, isPending: isTaskUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateTaskItem> }) =>
      updateTask(id, data),
    onSuccess() {
      refetch();
      handleCloseTaskModal();
      toast.success("Task Updated Successfully", { position: "bottom-right" });
    },
    onError(error) {
      console.log("Error updating task", error);
      toast.error("Error updating task", { position: "bottom-right" });
    },
  });

  return {
    taskItems,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    deleteTaskItem,
    isDeleting,
    addTask,
    isCreatingTask,
    updaetTaskItem,
    isTaskUpdating,
    isTaskModalOpen,
    handleAddTaskModal,
    handleUpdateTaskModal,
    handleCloseTaskModal,
  };
}
