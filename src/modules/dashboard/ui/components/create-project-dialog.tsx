"use client";

import { useState } from "react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
} from "@/components/ui/responsive-dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { RHFInput } from "@/components/form/ui/components/rhf-input";
import { RHFormContainer } from "@/components/form/ui/components/rhf-form-container";
import { useTRPC } from "@/trpc/client";
import { SubmitStatus } from "@/modules/auth/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useDialogStore } from "@/store/dialog-store";

const TOTAL_FREE_PROJECTS = 3;

const projectFormSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

export function CreateProjectDialog() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { setOpen } = useDialogStore();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  // Check project limit
  const { data: projects } = useSuspenseQuery(trpc.project.list.queryOptions());
  const canCreateProject = projects.length < TOTAL_FREE_PROJECTS;

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createProject = useMutation(
    trpc.project.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.project.list.queryFilter());
        setOpen(false);
        form.reset();
        setSubmitStatus({
          type: "success",
          message: "Project created successfully!",
        });
      },
      onError: (error) => {
        setSubmitStatus({
          type: "error",
          message: error.message || "Failed to create project",
        });
      },
    })
  );

  const onSubmit = async (data: ProjectFormData) => {
    setSubmitStatus({ type: "pending", message: "Creating project..." });
    createProject.mutate({
      name: data.name,
      description: data.description || "",
    });
  };

  const isLoading = form.formState.isSubmitting || createProject.isPending;

  return (
    <ResponsiveDialog
      triger={
        <Button size="lg" disabled={!canCreateProject}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      }
      title="Create New Project"
      description="Start a new project to begin your clarity call"
    >
      <>
        {!canCreateProject && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You&apos;ve reached your free project limit. Upgrade to create
              more projects.
            </AlertDescription>
          </Alert>
        )}
        <RHFormContainer
          form={form}
          onSubmit={onSubmit}
          status={submitStatus}
          showDebug={false}
          disabled={isLoading}
        >
          <RHFInput
            name="name"
            control={form.control}
            type="text"
            label="Project Name"
            placeholder="e.g., AI Email Assistant"
            disabled={isLoading}
          />
          <RHFInput
            name="description"
            control={form.control}
            type="textarea"
            label="Short Description"
            placeholder="Brief description of your SaaS idea..."
            disabled={isLoading}
          />
          <DialogFooter>
            <ResponsiveDialogClose>
              <Button
                className="w-full md:w-fit"
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset();
                  setSubmitStatus({ type: null, message: "" });
                }}
              >
                Cancel
              </Button>
            </ResponsiveDialogClose>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </RHFormContainer>
      </>
    </ResponsiveDialog>
  );
}
