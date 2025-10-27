"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Phone,
  CheckCircle2,
  Clock,
  Lock,
  Circle,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useParams } from "next/navigation";

type CallStatus = "upcoming" | "in-progress" | "processing" | "completed";

interface Call {
  id: string;
  type: "clarity" | "strategy";
  status: CallStatus;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [description, setDescription] = useState(
    "An AI-powered email assistant that helps busy professionals manage their inbox more efficiently. Features include smart categorization, auto-responses, and priority sorting."
  );

  const calls: Call[] = [
    { id: "1", type: "clarity", status: "completed" },
    { id: "2", type: "strategy", status: "upcoming" },
  ];

  const getCallIcon = (status: CallStatus) => {
    switch (status) {
      case "upcoming":
        return Circle;
      case "in-progress":
        return Clock;
      case "processing":
        return Clock;
      case "completed":
        return CheckCircle2;
    }
  };

  const getStatusBadge = (status: CallStatus) => {
    const configs = {
      upcoming: { label: "Upcoming", variant: "secondary" as const },
      "in-progress": { label: "In Progress", variant: "default" as const },
      processing: { label: "Processing", variant: "outline" as const },
      completed: { label: "Completed", variant: "default" as const },
    };
    return configs[status];
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex-1">
                <h1 className="text-xl font-semibold">AI Email Assistant</h1>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="p-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="calls">Calls</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Project Description
                  </h2>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Describe your SaaS idea, target audience, and key goals
                  </p>
                </Card>

                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-accent/50">
                      <div className="text-2xl font-bold text-primary">2</div>
                      <div className="text-sm text-muted-foreground">
                        Total Calls
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/50">
                      <div className="text-2xl font-bold text-primary">1</div>
                      <div className="text-sm text-muted-foreground">
                        Completed
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/50">
                      <div className="text-2xl font-bold text-primary">2</div>
                      <div className="text-sm text-muted-foreground">
                        Documents
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="calls" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {calls.map((call) => {
                    const StatusIcon = getCallIcon(call.status);
                    const statusConfig = getStatusBadge(call.status);
                    const isLocked =
                      call.type === "strategy" &&
                      calls[0].status !== "completed";

                    return (
                      <Card
                        key={call.id}
                        className={`p-6 ${
                          isLocked
                            ? "opacity-60"
                            : "hover:shadow-lg transition-shadow cursor-pointer"
                        }`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-3 rounded-xl ${
                                  isLocked
                                    ? "bg-muted"
                                    : "bg-gradient-to-br from-primary/10 to-secondary/10"
                                }`}
                              >
                                {isLocked ? (
                                  <Lock className="h-6 w-6 text-muted-foreground" />
                                ) : (
                                  <Phone className="h-6 w-6 text-primary" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg capitalize">
                                  {call.type} Call
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {call.type === "clarity"
                                    ? "Validate your idea and identify gaps"
                                    : "Deep dive into implementation details"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <StatusIcon className="h-4 w-4 text-muted-foreground" />
                            <Badge variant={statusConfig.variant}>
                              {statusConfig.label}
                            </Badge>
                          </div>

                          {isLocked ? (
                            <div className="pt-4 border-t border-border">
                              <p className="text-sm text-muted-foreground">
                                Complete the Clarity Call to unlock this session
                              </p>
                            </div>
                          ) : call.status === "completed" ? (
                            <Button asChild className="w-full">
                              <Link href={`/call/${call.id}`}>
                                View Details
                              </Link>
                            </Button>
                          ) : call.status === "processing" ? (
                            <Button disabled className="w-full">
                              <Clock className="mr-2 h-4 w-4 animate-spin" />
                              Processing results...
                            </Button>
                          ) : (
                            <Button asChild className="w-full">
                              <Link href={`/call/${call.id}/live`}>
                                Join Call
                              </Link>
                            </Button>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProjectDetail;
