import { pgEnum } from "drizzle-orm/pg-core";

export const postStatusValues = ["Draft", "Published", "Archived"] as const;

export const postStatusEnum = pgEnum("post_status", postStatusValues);
