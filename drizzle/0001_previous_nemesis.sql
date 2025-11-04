CREATE TYPE "public"."call_recomendation" AS ENUM('build', 'adjust', 'validate_more');--> statement-breakpoint
CREATE TYPE "public"."call_status" AS ENUM('upcoming', 'in_progress', 'processing', 'completed', 'cancled');--> statement-breakpoint
CREATE TYPE "public"."call_type" AS ENUM('clarity', 'strategy');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('prd', 'technical_proposal');--> statement-breakpoint
CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_description_unique" UNIQUE("description")
);
--> statement-breakpoint
CREATE TABLE "call" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"type" "call_type" NOT NULL,
	"status" "call_status" DEFAULT 'upcoming' NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"recording_url" text,
	"transcript_url" text,
	"summary" text,
	"recommendation" "call_recomendation",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"type" "document_type" NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"content" text NOT NULL,
	"created_from_call_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "call" ADD CONSTRAINT "call_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_created_from_call_id_call_id_fk" FOREIGN KEY ("created_from_call_id") REFERENCES "public"."call"("id") ON DELETE set null ON UPDATE no action;