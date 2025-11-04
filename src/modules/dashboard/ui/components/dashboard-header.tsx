import { Suspense } from "react";
import { CreateProjectDialog } from "./create-project-dialog";
import { ErrorBoundary } from "react-error-boundary";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">My Projects</h2>
        <p className="text-muted-foreground">
          Manage your AI-powered planning sessions
        </p>
      </div>
      <Suspense>
        <ErrorBoundary fallback={<div></div>}>
          <CreateProjectDialog />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
