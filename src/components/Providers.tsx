"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { MessagesProvider } from "@/(contexts)/messages";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
