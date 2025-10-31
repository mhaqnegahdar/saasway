import React from "react";
import SigninForm from "@/modules/auth/ui/components/signin-form";

export default function SigninView() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <SigninForm/>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-accent to-secondary/10 items-center justify-center p-12">
        <div className="max-w-md space-y-6 text-center">
          <div className="text-6xl mb-8">🎙️</div>
          <h2 className="text-3xl font-bold">Talk Your Way to Clarity</h2>
          <p className="text-lg text-muted-foreground">
            Voice-first product planning that feels like working with a real
            strategist
          </p>
        </div>
      </div>
    </div>
  );
}
