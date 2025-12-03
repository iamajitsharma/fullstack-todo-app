//import shadcn ui components
import { Badge } from "@/components/ui/badge";

export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

const StatusUI = {
  [TaskStatus.PENDING]: {
    label: "Pending",
    className: "bg-yellow-500 text-white",
  },
  [TaskStatus.COMPLETED]: {
    label: "Completed",
    className: "bg-green-600 text-white",
  },
} as const;

type StatusBadgeProps = {
  status: TaskStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const ui = StatusUI[status];

  return <Badge className={ui.className}>{ui.label}</Badge>;
}
