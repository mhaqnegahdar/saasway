import { pgEnum } from "drizzle-orm/pg-core";

// Call
export const callTypeValues = ["clarity", "strategy"] as const;

export const callTypeEnum = pgEnum("call_type", callTypeValues);

export const callStatusValues = [
  "upcoming",
  "in_progress",
  "processing",
  "completed",
  "cancled",
] as const;

export const callStatusEnum = pgEnum("call_status", callStatusValues);

export const callRecomendationValues = [
  "build",
  "adjust",
  "validate_more",
] as const;

export const callRecomendationEnum = pgEnum(
  "call_recomendation",
  callRecomendationValues
);

//  Document

export const documentTypeValues = ["prd", "technical_proposal"] as const;

export const documentTypeEnum = pgEnum("document_type", documentTypeValues);
