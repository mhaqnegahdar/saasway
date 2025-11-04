"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SVGLogo from "@/components/layout/logo";
import { RHFormContainer } from "@/components/form/ui/components/rhf-form-container";
import { RHFInput } from "@/components/form/ui/components/rhf-input";

import { authClient } from "@/lib/auth/auth-client";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/modules/auth/lib/schema";
import { SubmitStatus } from "@/modules/auth/lib/types";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setSubmitStatus({
        type: "error",
        message: "Invalid or missing reset token",
      });
      return;
    }

    try {
      setSubmitStatus({ type: "pending", message: "Resetting password..." });

      await authClient.resetPassword({
        newPassword: data.password,
        token,
      });

      setIsSuccess(true);
      setSubmitStatus({ type: null, message: "" });

      // Redirect after 3 seconds
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      console.error("Reset password error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to reset password. The link may have expired.",
      });
    }
  };

  // Invalid token state
  if (!token) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Invalid Reset Link</h1>
          <p className="text-muted-foreground">
            This password reset link is invalid or has expired.
          </p>
          <Link href="/forgot-password">
            <Button className="w-full">Request New Link</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Password reset!</h1>
            <p className="text-muted-foreground">
              Your password has been successfully reset
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground text-center">
              Redirecting you to sign in...
            </p>
            <Link href="/login">
              <Button className="w-full" size="lg">
                Continue to sign in
              </Button>
            </Link>
          </div>
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
          <h1 className="text-3xl font-bold">Set new password</h1>
          <p className="text-muted-foreground">
            Choose a strong password for your account
          </p>
        </div>

        <RHFormContainer
          form={form}
          onSubmit={onSubmit}
          submitText="Reset password"
          loadingText="Resetting..."
          status={submitStatus}
          showDebug={false}
        >
          <RHFInput
            name="password"
            control={form.control}
            type="password"
            label="New password"
            placeholder="••••••••"
            description="Must be at least 8 characters"
          />
          <RHFInput
            name="passwordConfirm"
            control={form.control}
            type="password"
            label="Confirm new password"
            placeholder="••••••••"
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
