import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdddTaskForm({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add Task</DialogTitle>
        </DialogHeader>
        <form>
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input placeholder="Task Title" id="title" className="h-12" />
            </Field>
            <Field>
              <FieldLabel htmlFor="desc">Description</FieldLabel>
              <Textarea
                id="desc"
                placeholder="Write description"
                className="resize-none h-20"
              />
            </Field>
          </FieldGroup>
          <div className="pt-6">
            <Button className="w-full py-5">Add Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
