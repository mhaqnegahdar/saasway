import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Circle, Lock, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ButtonProps } from "@/components/ui/button";

type CallStatus =
  | "upcoming"
  | "in_progress"
  | "processing"
  | "completed"
  | "cancelled";

interface Call {
  id: string;
  type: "clarity" | "strategy";
  status: CallStatus;
}

interface Project {
  id: string;
  name: string;
  description: string;
  updatedAt: Date;
  calls?: Call[];
}

interface ProjectCardProps {
  project: Project;
}

const STATUS_CONFIG = {
  upcoming: {
    label: "Upcoming",
    variant: "secondary" as const,
    icon: Circle,
  },
  in_progress: {
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
  cancelled: {
    label: "Cancelled",
    variant: "destructive" as const,
    icon: Circle,
  },
} as const satisfies Record<
  CallStatus,
  {
    label: string;
    variant: ButtonProps["variant"];
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }
>;

function getStatusConfig(status: CallStatus) {
  return STATUS_CONFIG[status];
}

export function ProjectCard({ project }: ProjectCardProps) {
  const clarityCall = project.calls?.find((c) => c.type === "clarity");
  const strategyCall = project.calls?.find((c) => c.type === "strategy");

  const clarityStatus = (clarityCall?.status || "upcoming") as CallStatus;
  const strategyStatus = (strategyCall?.status || "upcoming") as CallStatus;

  const clarityConfig = getStatusConfig(clarityStatus);
  const strategyConfig = getStatusConfig(strategyStatus);

  const isClarityCompleted = clarityStatus === "completed";
  const docsReady =
    clarityStatus === "completed" && strategyStatus === "completed";

  return (
    <Link href={`/project/${project.id}`}>
      <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
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
            {/* Clarity Call Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <clarityConfig.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Clarity Call</span>
              </div>
              <Badge variant={clarityConfig.variant} className="text-xs">
                {clarityConfig.label}
              </Badge>
            </div>

            {/* Strategy Call Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                {!isClarityCompleted ? (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <strategyConfig.icon className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-muted-foreground">Strategy Call</span>
              </div>
              <Badge
                variant={
                  !isClarityCompleted ? "outline" : strategyConfig.variant
                }
                className="text-xs"
              >
                {!isClarityCompleted ? "Locked" : strategyConfig.label}
              </Badge>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Updated {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
