import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { project, call } from "@/db/schema";
import db from "@/db";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  // ------------------------------------------------
  // Get projects for the logged-in user
  // ------------------------------------------------
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth?.user.id;

    if (!userId)
      throw new TRPCError({
        message: "User doesnt exist",
        code: "UNAUTHORIZED",
      });

    return db.query.project.findMany({
      where: eq(project.userId, userId),
      with: {
        calls: true,
        document: true,
      },
      orderBy: (project, { desc }) => [desc(project.createdAt)],
    });
  }),

  // ------------------------------------------------
  // Get a single project by ID (must belong to user)
  // ------------------------------------------------
  getById: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.auth?.user.id;

      if (!userId)
        throw new TRPCError({
          message: "User doesnt exist",
          code: "UNAUTHORIZED",
        });
      return db.query.project.findFirst({
        where: and(eq(project.id, input.projectId), eq(project.userId, userId)),
        with: {
          calls: true,
          document: true,
        },
      });
    }),

  // ------------------------------------------------
  // Create a new project + auto-create Clarity Call
  // ------------------------------------------------
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth?.user.id;

      if (!userId)
        throw new TRPCError({
          message: "User doesnt exist",
          code: "UNAUTHORIZED",
        });

      const [newProject] = await db
        .insert(project)
        .values({
          userId: userId,
          name: input.name,
          description: input.description ?? "",
        })
        .returning();

      // Automatically create Clarity call (upcoming)
      await db.insert(call).values({
        projectId: newProject.id,
        type: "clarity",
        status: "upcoming",
      });

      return newProject;
    }),

  // ------------------------------------------------
  // Attempt to create Strategy Call (only allowed if
  // Clarity call exists + is completed)
  // ------------------------------------------------
  createStrategyCall: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth?.user.id;

      if (!userId)
        throw new TRPCError({
          message: "User doesnt exist",
          code: "UNAUTHORIZED",
        });

      const proj = await db.query.project.findFirst({
        where: and(eq(project.id, input.projectId), eq(project.userId, userId)),
        with: { calls: true },
      });

      if (!proj) throw new Error("Project not found or not authorized.");

      const clarity = proj.calls.find((c) => c.type === "clarity");
      if (!clarity)
        throw new Error("Clarity call missing (should not happen).");
      if (clarity.status !== "completed") {
        throw new Error(
          "Cannot schedule strategy call until clarity call is completed."
        );
      }

      const existingStrategy = proj.calls.find((c) => c.type === "strategy");
      if (existingStrategy) throw new Error("Strategy call already exists.");

      const [strategyCall] = await db
        .insert(call)
        .values({
          projectId: proj.id,
          type: "strategy",
          status: "upcoming",
        })
        .returning();

      return strategyCall;
    }),

  // ------------------------------------------------
  // Update basic project fields
  // ------------------------------------------------
  update: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth?.user.id;

      if (!userId)
        throw new TRPCError({
          message: "User doesnt exist",
          code: "UNAUTHORIZED",
        });

      await db
        .update(project)
        .set({
          name: input.name,
          description: input.description,
        })
        .where(
          and(eq(project.id, input.projectId), eq(project.userId, userId))
        );
    }),

  // ------------------------------------------------
  // Delete project (cascade deletes calls/docs)
  // ------------------------------------------------
  delete: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth?.user.id;

      if (!userId)
        throw new TRPCError({
          message: "User doesnt exist",
          code: "UNAUTHORIZED",
        });

      await db
        .delete(project)
        .where(
          and(eq(project.id, input.projectId), eq(project.userId, userId))
        );
    }),
});
