import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function TodoLayout({ children }: Props) {
  return <main className="w-full h-screen overflow-hidden">{children}</main>;
}
