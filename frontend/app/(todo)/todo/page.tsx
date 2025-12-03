//import node modules libraries
import { Metadata } from "next";

//import custom components
import TaskList from "../components/TaskList";

export const metadata: Metadata = {
  title: "Todo",
  description: "A todo appliction",
};

export default function Todo() {
  return <TaskList />;
}
