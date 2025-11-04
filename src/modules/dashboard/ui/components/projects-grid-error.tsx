"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ProjectsGridError() {
  const router = useRouter();

  return (
    <Card className="p-12 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-5xl">🚧</div>

        <h3 className="text-xl font-semibold">Unable to load projects</h3>

        <p className="text-muted-foreground text-sm">
          Something went wrong while fetching your projects.<br></br>Refresh and try again.
        </p>

        <Button onClick={() => router.refresh()}>Refresh</Button>
      </div>
    </Card>
  );
}

