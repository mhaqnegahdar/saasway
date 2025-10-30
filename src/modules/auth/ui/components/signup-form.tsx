"use client";

// Hooks and Packages
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SVGLogo from "@/components/layout/logo";
import { RHFormContainer } from "@/components/form/ui/components/rhf-form-container";
import { RHFInput } from "@/components/form/ui/components/rhf-input";

// Utils
import { authClient } from "@/lib/auth/auth-client";

// Schema
import { SignupFormData, signupSchema } from "@/modules/auth/schema";

// Icons
import { IconBrandGoogle } from "@tabler/icons-react";
import { Linkedin } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "pending" | null;
    message: string;
  }>({ type: null, message: "" });

  // Track social login loading states
  const [socialLoading, setSocialLoading] = useState<{
    linkedin: boolean;
    google: boolean;
  }>({ linkedin: false, google: false });

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const isAnyLoading =
    form.formState.isSubmitting ||
    socialLoading.linkedin ||
    socialLoading.google;

  const onSubmit = async (data: SignupFormData) => {
    try {
      setSubmitStatus({ type: "pending", message: "signing up..." });

      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      });

      if (result.error) {
        console.log("Result", result);
        throw new Error(result.error.message || "Something went wrong!");
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong!",
      });
    }
  };

  const handleSocialLogin = async (provider: "linkedin" | "google") => {
    try {
      setSocialLoading((prev) => ({ ...prev, [provider]: true }));
      setSubmitStatus({
        type: "pending",
        message: `signing up with ${provider}...`,
      });

      const result = await authClient.signIn.social({
        provider: provider,
        callbackURL: "/dashboard", // Redirect URL after successful login
      });

      if (result.error) {
        throw new Error(
          result.error.message || `Failed to sign up with ${provider}`
        );
      }
    } catch (error) {
      console.error(`${provider} logup error:`, error);

      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : `Failed to sign up with ${provider}. Please try again.`,
      });
    } finally {
      setSocialLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="size-12">
              <SVGLogo />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-muted-foreground">
            Start your first clarity call today
          </p>
        </div>

        <RHFormContainer
          form={form}
          onSubmit={onSubmit}
          submitText="Create account"
          loadingText="Creating account..."
          status={submitStatus}
          showDebug={false}
          disabled={isAnyLoading}
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="">
              <RHFInput
                name="name"
                control={form.control}
                type="text"
                label="Name"
                placeholder="john Doe"
                disabled={isAnyLoading}
              />
            </div>
            <RHFInput
              name="email"
              control={form.control}
              type="email"
              label="Email"
              placeholder="john@example.com"
              disabled={isAnyLoading}
            />
          </div>
          <RHFInput
            name="password"
            control={form.control}
            type="password"
            label="Password"
            placeholder="••••••••"
            disabled={isAnyLoading}
          />
          <RHFInput
            name="passwordConfirm"
            control={form.control}
            type="password"
            label="Password Confirm"
            placeholder="••••••••"
            disabled={isAnyLoading}
          />
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

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            type="button"
            className="grow"
            onClick={() => handleSocialLogin("google")}
            disabled={isAnyLoading}
          >
            {socialLoading.google ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <IconBrandGoogle />
            )}
            Google
          </Button>
          <Button
            variant="outline"
            type="button"
            className="grow"
            onClick={() => handleSocialLogin("linkedin")}
            disabled={isAnyLoading}
          >
            {socialLoading.linkedin ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Linkedin />
            )}
            LinkedIn
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
