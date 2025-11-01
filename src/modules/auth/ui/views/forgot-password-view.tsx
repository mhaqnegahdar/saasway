
import ForgotPasswordForm from "@/modules/auth/ui/components/forgot-password-form";
import AuthIllustration from "@/modules/auth/ui/components/auth-illustration";

export default function ForgotPasswordView() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <ForgotPasswordForm />

      {/* Right side - Illustration */}
      <AuthIllustration
        emoji="🔐"
        title="Secure Account Recovery"
        description="We'll help you get back to building amazing products"
      />
    </div>
  );
}