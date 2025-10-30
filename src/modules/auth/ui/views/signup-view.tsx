import React from "react";
import SignupForm from "@/modules/auth/ui/components/signup-form";

export default function SignupView() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-secondary/10 via-accent to-primary/10 items-center justify-center p-12">
        <div className="max-w-md space-y-6 text-center">
          <div className="text-6xl mb-8">📄</div>
          <h2 className="text-3xl font-bold">Get Ready-to-Build Docs</h2>
          <p className="text-lg text-muted-foreground">
            PRDs and technical proposals generated from your voice conversations
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <SignupForm />
    </div>
  );
}
