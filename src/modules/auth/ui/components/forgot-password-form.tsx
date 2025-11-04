"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { MailIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SVGLogo from "@/components/layout/logo";
import { RHFormContainer } from "@/components/form/ui/components/rhf-form-container";
import { RHFInput } from "@/components/form/ui/components/rhf-input";

import { authClient } from "@/lib/auth/auth-client";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/modules/auth/lib/schema";
import { SubmitStatus } from "@/modules/auth/lib/types";

export default function ForgotPasswordForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setSubmitStatus({ type: "pending", message: "Sending reset link..." });

      await authClient.forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      });

      setEmail(data.email);
      setIsSuccess(true);
      setSubmitStatus({ type: null, message: "" });
    } catch (error) {
      console.error("Forgot password error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send reset email. Please try again.",
      });
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <MailIcon className="size-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Check your email</h1>
            <p className="text-muted-foreground">
              We&apos;ve sent a password reset link to
            </p>
            <p className="font-medium">{email}</p>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground text-center">
              Didn&apos;t receive the email? Check your spam folder or
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
            >
              Try another email
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground pt-4">
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Back to sign in
            </Link>
          </p>
        </Card>
      </div>
    );
  }

  // Form state
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="size-12">
              <SVGLogo />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Forgot password?</h1>
          <p className="text-muted-foreground">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        <RHFormContainer
          form={form}
          onSubmit={onSubmit}
          submitText="Send reset link"
          loadingText="Sending..."
          status={submitStatus}
          showDebug={false}
        >
          <RHFInput
            name="email"
            control={form.control}
            type="email"
            label="Email"
            placeholder="you@example.com"
          />
        </RHFormContainer>

        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            ← Back to sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
