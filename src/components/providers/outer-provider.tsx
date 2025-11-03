import React from "react";
import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "@/trpc/client";

export default function OuterProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TRPCReactProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </TRPCReactProvider>
    </>
  );
}
