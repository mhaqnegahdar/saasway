// src/app/(dashboard)/dashboard/page.tsx
import { Suspense } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { DashboardHeader } from "@/modules/dashboard/ui/components/dashboard-header";
import { UsageBanner } from "@/modules/dashboard/ui/components/usage-banner";
import { ProjectsGrid } from "@/modules/dashboard/ui/components/projects-grid";
import { ProjectsGridSkeleton } from "@/modules/dashboard/ui/components/projects-grid-skeleton";
import { EmptyProjects } from "@/modules/dashboard/ui/components/empty-projects";
import { ErrorBoundary } from "react-error-boundary";
import { ProjectsGridError } from "../components/projects-grid-error";

export default function DashboardView() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <Suspense
              fallback={
                <div className="h-32 animate-pulse bg-muted rounded-lg" />
              }
            >
              <ErrorBoundary fallback={<div></div>}>
                <UsageBanner />
              </ErrorBoundary>
            </Suspense>
          
                <DashboardHeader />
        
            <Suspense fallback={<ProjectsGridSkeleton />}>
              <ErrorBoundary fallback={<ProjectsGridError />}>
                <ProjectsContent />
              </ErrorBoundary>
            </Suspense>
          </div>
        </>
      </SidebarInset>
    </SidebarProvider>
  );
}

function ProjectsContent() {
  return (
    <>
      <ProjectsGrid />
      {/* <EmptyProjects /> */}
    </>
  );
}
