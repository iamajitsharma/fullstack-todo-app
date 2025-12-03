"use client";
//import node modules libraries
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//import shadcn ui components
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//import custom components
import ErrorMessage from "@/components/common/ErrorMessage";

//import redux store hooks
import { useAppSelector } from "@/store/store";

//import custom hooks
import useTask from "@/hooks/useTask";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["pending", "completed"]),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AddUpdateTaskForm() {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const selectedTask = useAppSelector((state) => state.todo.selectedTask);

  const { addTask, updaetTaskItem, isTaskModalOpen, handleCloseTaskModal } =
    useTask();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      status: "pending",
      description: "",
    },
  });

  // Setting form values when selectedTask changes
  useEffect(() => {
    if (selectedTask) {
      reset({
        title: selectedTask.title,
        status: selectedTask.status,
        description: selectedTask.desc || "",
      });
      setIsUpdating(true);
    } else {
      reset({
        title: "",
        status: "pending",
        description: "",
      });
      setIsUpdating(false);
    }
  }, [selectedTask, reset]);

  const submitHandler = (data: FormValues) => {
    console.log(data);
    if (isUpdating) {
      updaetTaskItem({
        id: selectedTask!._id,
        data: { ...data, desc: data.description },
      });
    } else {
      addTask({
        title: data.title,
        desc: data.description || "",
        status: data.status,
      });
    }
  };

  return (
    <Dialog
      open={isTaskModalOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseTaskModal();
      }}
    >
      <DialogContent>
        <DialogHeader className="items-center">
          <DialogTitle className="text-center">
            {isUpdating ? "Update Task" : "Add Task"}
          </DialogTitle>
          <DialogDescription>
            {isUpdating ? "Modify Task Details" : "Add a New Task"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                placeholder="Task Title"
                id="title"
                className="h-12"
                {...register("title")}
              />
              {errors.title && errors?.title?.message && (
                <ErrorMessage message={errors?.title?.message} />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent id="status">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.status && errors?.status?.message && (
                <ErrorMessage message={errors?.status?.message} />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="desc">Description</FieldLabel>
              <Textarea
                id="desc"
                placeholder="Write description"
                className="resize-none h-20"
                {...register("description")}
              />
              {errors.description && errors?.description?.message && (
                <ErrorMessage message={errors?.description?.message} />
              )}
            </Field>
          </FieldGroup>
          <div className="pt-6">
            <Button className="w-full py-5 cursor-pointer" type="submit">
              {selectedTask ? "Update Task" : "Add Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
