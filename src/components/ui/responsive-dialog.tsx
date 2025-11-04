"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useDialogStore } from "@/store/dialog-store";

interface ResponsiveDialogProps {
  className?: string;
  title: string;
  description: string;
  triger: React.ReactNode;
  children: React.ReactNode;
}

export function ResponsiveDialog({
  title,
  triger,
  description,
  children,
  className,
}: ResponsiveDialogProps) {
  const { open, setOpen } = useDialogStore();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triger}</DialogTrigger>
        <DialogContent className={cn("overflow-scroll  gap-4", className)}>
          <DialogHeader className="gap-1">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triger}</DrawerTrigger>
      <DrawerContent className={cn("px-4 pb-4", className)}>
        <DrawerHeader className="text-left gap-1">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}

export function ResponsiveDialogClose({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <DialogClose asChild>{children}</DialogClose>;
  }

  return <DrawerClose asChild>{children}</DrawerClose>;
}
