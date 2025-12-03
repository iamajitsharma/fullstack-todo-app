"use client";
//import node modules libraries
import * as React from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

//import custom hooks
import { useMount } from "@/hooks/useMount";

//import redux store
import { store } from "@/store/store";

// Create a client
const queryClient = new QueryClient();

export function ClientWrapper({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  const { hasMount } = useMount();

  if (!hasMount) return null;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          {...props}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
