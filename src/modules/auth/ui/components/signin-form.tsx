"use client";

// Hooks and Packages
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Components
import { Card } from "@/components/ui/card";
import SVGLogo from "@/components/layout/logo";
import { RHFormContainer } from "@/components/form/ui/components/rhf-form-container";
import { RHFInput } from "@/components/form/ui/components/rhf-input";
import SocialLogin from "@/modules/auth/ui/components/social-login";

// Utils
import { authClient } from "@/lib/auth/auth-client";

// Schema
import { SigninFormData, signinSchema } from "@/modules/auth/lib/schema";

// Types
import { SocialLoading, SubmitStatus } from "@/modules/auth/lib/types";

import { Label } from "@/components/ui/label";

export default function SigninForm() {
  const router = useRouter();

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  // Track social login loading states
  const [socialLoading, setSocialLoading] = useState<SocialLoading>({
    linkedin: false,
    google: false,
  });

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isAnyLoading =
    form.formState.isSubmitting ||
    socialLoading.linkedin ||
    socialLoading.google;

  const onSubmit = async (data: SigninFormData) => {
    try {
      setSubmitStatus({ type: "pending", message: "Signing in..." });

      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      });

      if (result.error) {
        throw new Error(result.error.message || "Invalid email or password");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Invalid email or password",
      });
    }
  };

  return (
    <>
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 space-y-8">
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="size-12">
                <SVGLogo />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to continue to SaaSWayz
            </p>
          </div>

          {/* Email/Password Form */}
          <RHFormContainer
            form={form}
            onSubmit={onSubmit}
            submitText="Sign in"
            loadingText="Signing in..."
            status={submitStatus}
            showDebug={false}
            disabled={isAnyLoading}
          >
            <RHFInput
              name="email"
              control={form.control}
              type="email"
              label="Email"
              placeholder="john@example.com"
              disabled={isAnyLoading}
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <RHFInput
                name="password"
                control={form.control}
                type="password"
                disabled={isAnyLoading}
                placeholder="••••••••"
              />
            </div>
          </RHFormContainer>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <SocialLogin
            socialLoading={socialLoading}
            setSocialLoading={setSocialLoading}
            setSubmitStatus={setSubmitStatus}
            isAnyLoading={isAnyLoading}
          />

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </>
  );
}
