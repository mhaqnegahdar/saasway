
// TODO: Re-export call status from your schema
export type CallStatus = "upcoming" | "in_progress" | "processing" | "completed" | "cancelled";
export type CallType = "clarity" | "strategy";

export const CALL_STATUSES: readonly CallStatus[] = [
  "upcoming",
  "in_progress", 
  "processing",
  "completed",
  "cancelled",
] as const;