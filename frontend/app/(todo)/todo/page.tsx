import TaskList from "../components/TaskList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo",
  description: "A todo appliction",
};

export default function Todo() {
  return (
    <section className="w-full h-full">
      <div className="flex flex-col items-center justify-center max-w-2xl w-full h-full mx-auto p-4 ">
        <TaskList />
      </div>
    </section>
  );
}
