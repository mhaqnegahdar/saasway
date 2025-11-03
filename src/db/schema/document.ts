import { pgTable, integer, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { project } from "./project";
import { documentTypeEnum } from "./enums";
import { call } from "./call";

export const document = pgTable("document", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => project.id, { onDelete: "cascade" })
    .notNull(),
  type: documentTypeEnum("type").notNull(),
  version: integer("version").notNull().default(1),
  content: text("content").notNull(),
  createdFromCallId: uuid("created_from_call_id").references(() => call.id, {
    onDelete: "set null",
  }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
