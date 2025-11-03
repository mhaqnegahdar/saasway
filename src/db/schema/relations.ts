import { relations } from "drizzle-orm";
import { user } from "./user";
import { session } from "./session";
import { account } from "./account";
import { project } from "./project";
import { call } from "./call";
import { document } from "./document";


export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  projects: many(project),
}));

export const projectRelations = relations(project, ({ one, many }) => ({
  owner: one(user, { fields: [project.userId], references: [user.id] }),
  calls: many(call),
  document: many(document),
}));

export const callRelations = relations(call, ({ one, many }) => ({
  project: one(project, { fields: [call.projectId], references: [project.id] }),
  createdDocument: many(document),
}));

export const documentRelations = relations(document, ({ one }) => ({
  project: one(project, {
    fields: [document.projectId],
    references: [project.id],
  }),
  createdFromCall: one(call, {
    fields: [document.createdFromCallId],
    references: [call.id],
  }),
}));
