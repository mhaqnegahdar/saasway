"use client";

// Components
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";

// Icons
import { IconBrandGoogle } from "@tabler/icons-react";
import { Linkedin } from "lucide-react";

// Types
import { SocialLoading, SubmitStatus } from "@/modules/auth/lib/types";

interface SocialLoginProps {
  socialLoading: SocialLoading;
  setSocialLoading: React.Dispatch<React.SetStateAction<SocialLoading>>;
  setSubmitStatus: React.Dispatch<React.SetStateAction<SubmitStatus>>;
  isAnyLoading: boolean;
}

export default function SocialLogin({
  socialLoading,
  setSocialLoading,
  setSubmitStatus,
  isAnyLoading,
}: SocialLoginProps) {
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
  );
}
