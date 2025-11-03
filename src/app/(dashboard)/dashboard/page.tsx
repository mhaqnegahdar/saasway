"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Plus, Clock, CheckCircle2, Circle, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type ProjectStatus = "upcoming" | "in-progress" | "processing" | "completed";

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  clarityStatus: ProjectStatus;
  strategyStatus: ProjectStatus;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "AI Email Assistant",
    description: "Smart email responses for busy professionals",
    lastUpdated: "2 hours ago",
    clarityStatus: "completed",
    strategyStatus: "completed",
  },
  {
    id: "2",
    name: "Fitness Tracking SaaS",
    description: "Comprehensive workout and nutrition tracker",
    lastUpdated: "1 day ago",
    clarityStatus: "completed",
    strategyStatus: "upcoming",
  },
];

const getStatusConfig = (status: ProjectStatus) => {
  const configs = {
    upcoming: {
      label: "Upcoming",
      variant: "secondary" as const,
      icon: Circle,
    },
    "in-progress": {
      label: "In Progress",
      variant: "default" as const,
      icon: Clock,
    },
    processing: {
      label: "Processing",
      variant: "outline" as const,
      icon: Clock,
    },
    completed: {
      label: "Completed",
      variant: "default" as const,
      icon: CheckCircle2,
    },
  };
  return configs[status];
};

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  const usedProjects = projects.length;
  const totalProjects = 3;
  const progressPercentage = (usedProjects / totalProjects) * 100;

  const handleCreateProject = () => {
    if (newProject.name && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        name: newProject.name,
        description: newProject.description,
        lastUpdated: "Just now",
        clarityStatus: "upcoming",
        strategyStatus: "upcoming",
      };
      setProjects([project, ...projects]);
      setNewProject({ name: "", description: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
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
          {/* Usage Banner */}
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Free Projects</h3>
                <p className="text-sm text-muted-foreground">
                  {totalProjects - usedProjects} of {totalProjects} remaining
                </p>
              </div>
              <Button variant="outline" size="sm">
                Upgrade Plan
              </Button>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </Card>

          {/* Header with Create Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">My Projects</h2>
              <p className="text-muted-foreground">
                Manage your AI-powered planning sessions
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Start a new project to begin your clarity call
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., AI Email Assistant"
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your SaaS idea..."
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProject}>Create Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const clarityConfig = getStatusConfig(project.clarityStatus);
              const strategyConfig = getStatusConfig(project.strategyStatus);
              const docsReady =
                project.clarityStatus === "completed" &&
                project.strategyStatus === "completed";

              return (
                <Link key={project.id} href={`/project/${project.id}`}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {project.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        {docsReady && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Docs Ready
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <clarityConfig.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Clarity Call
                            </span>
                          </div>
                          <Badge
                            variant={clarityConfig.variant}
                            className="text-xs"
                          >
                            {clarityConfig.label}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            {project.strategyStatus === "upcoming" &&
                            project.clarityStatus !== "completed" ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <strategyConfig.icon className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-muted-foreground">
                              Strategy Call
                            </span>
                          </div>
                          <Badge
                            variant={
                              project.clarityStatus !== "completed"
                                ? "outline"
                                : strategyConfig.variant
                            }
                            className="text-xs"
                          >
                            {project.clarityStatus !== "completed"
                              ? "Locked"
                              : strategyConfig.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Updated {project.lastUpdated}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {projects.length === 0 && (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-5xl">📁</div>
                <h3 className="text-xl font-semibold">No projects yet</h3>
                <p className="text-muted-foreground">
                  Create your first project to start your AI-powered planning
                  journey
                </p>
                <Button onClick={() => setIsDialogOpen(true)} size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </div>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
