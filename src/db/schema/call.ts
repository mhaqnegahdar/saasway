import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { project } from "./project";
import { callRecomendationEnum, callStatusEnum, callTypeEnum } from "./enums";


export const call = pgTable("call", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => project.id, { onDelete: "cascade" })
    .notNull(),
  type: callTypeEnum("type").notNull(),
  status: callStatusEnum("status").notNull().default("upcoming"),

  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),

  recordingUrl: text("recording_url"),
  transcriptUrl: text("transcript_url"),
  summary: text("summary"),

  recommendation: callRecomendationEnum("recommendation"), // clarity calls only

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
