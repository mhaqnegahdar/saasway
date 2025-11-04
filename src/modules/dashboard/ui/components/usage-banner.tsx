"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTRPC } from "@/trpc/client";

const TOTAL_FREE_PROJECTS = 3;

export function UsageBanner() {
  const trpc = useTRPC();
  const { data: projects } = useSuspenseQuery(trpc.project.list.queryOptions());

  const usedProjects = projects.length;
  const progressPercentage = (usedProjects / TOTAL_FREE_PROJECTS) * 100;

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">Free Projects</h3>
          <p className="text-sm text-muted-foreground">
            {TOTAL_FREE_PROJECTS - usedProjects} of {TOTAL_FREE_PROJECTS} remaining
          </p>
        </div>
        <Button variant="outline" size="sm">
          Upgrade Plan
        </Button>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </Card>
  );
}