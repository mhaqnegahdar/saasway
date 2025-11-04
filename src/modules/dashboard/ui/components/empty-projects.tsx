"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { CreateProjectDialog } from "./create-project-dialog";

export function EmptyProjects() {
  const trpc = useTRPC();
  const { data: projects } = useSuspenseQuery(trpc.project.list.queryOptions());

  if (projects.length > 0) {
    return null;
  }

  return (
    <Card className="p-12 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-5xl">📁</div>
        <h3 className="text-xl font-semibold">No projects yet</h3>
        <p className="text-muted-foreground">
          Create your first project to start your AI-powered planning journey
        </p>
        <CreateProjectDialog />
      </div>
    </Card>
  );
}
