"use client";
import * as React from "react";
import { ThemeProvider } from "next-themes";
import { useMount } from "@/hooks/useMount";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export function ClientWrapper({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  const { hasMount } = useMount();

  if (!hasMount) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
