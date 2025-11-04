"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ProjectCard } from "@/modules/dashboard/ui/components/project-card";

export function ProjectsGrid() {
  const trpc = useTRPC();
  const { data: projects } = useSuspenseQuery(trpc.project.list.queryOptions());

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        // TODO: Fix Project type error
        // @ts-expect-error temporary untyped project object
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}