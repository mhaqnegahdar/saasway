
import ResetPasswordForm from "@/modules/auth/ui/components/reset-password-form";
import AuthIllustration from "@/modules/auth/ui/components/auth-illustration";

export default function ResetPasswordView() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <ResetPasswordForm />

      {/* Right side - Illustration */}
      <AuthIllustration
        emoji="🔒"
        title="Create a Strong Password"
        description="Keep your account secure with a unique password"
      />
    </div>
  );
}