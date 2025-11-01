import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const data = await resend.emails.send({
      from: "SaaSWayz <saaswayz.support@email.mhaqnegahdar.site>",
      to: [to],
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
}

// Password reset email template
export function getPasswordResetEmailHTML(resetUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - SaaSWayz</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FBF8F6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #FBF8F6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <!-- Main Container -->
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 16px rgba(255, 138, 61, 0.12);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <!-- Your SVG Logo -->
               <img 
                      src="https://ik.imagekit.io/mhaqnegahdar/saaswayz/logo.png?updatedAt=1761993727056" 
                      alt="SaaSWayz Logo" 
                      width="64" 
                      height="64" 
                      style="display: block; width: 64px; height: 64px; margin: 0 auto; border-radius: 12px;" 
                    />
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #3C3A47; line-height: 1.3;">Reset Your Password</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #6B6B7B;">
                Hi there,
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #6B6B7B;">
                We received a request to reset your password for your SaaSWayz account. Click the button below to create a new password:
              </p>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 40px 30px;">
              <a href="${resetUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #FF8A3D 0%, #FFB380 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 16px rgba(255, 138, 61, 0.3);">
                Reset Password
              </a>
            </td>
          </tr>
          
          <!-- Alternative Link -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 1.6; color: #9CA3AF;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin: 0; padding: 12px; background-color: #FBF8F6; border-radius: 6px; font-size: 13px; color: #FF8A3D; word-break: break-all; font-family: 'Courier New', monospace;">
                ${resetUrl}
              </p>
            </td>
          </tr>
          
          <!-- Security Notice -->
          <tr>
            <td style="padding: 20px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #FEF3C7; border-radius: 8px; padding: 16px;">
                <tr>
                  <td style="width: 30px; vertical-align: top; padding-right: 12px;">
                    <div style="width: 24px; height: 24px; background-color: #F59E0B; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-weight: bold; font-size: 16px;">⚠</div>
                  </td>
                  <td style="vertical-align: top;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #92400E; font-weight: 600;">
                      Security Notice
                    </p>
                    <p style="margin: 4px 0 0; font-size: 13px; line-height: 1.5; color: #92400E;">
                      This link will expire in <strong>1 hour</strong>. If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <div style="border-top: 1px solid #F3F3F3;"></div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <p style="margin: 0 0 10px; font-size: 14px; line-height: 1.6; color: #9CA3AF;">
                Questions? We're here to help.
              </p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #9CA3AF;">
                Contact us at <a href="mailto:mhaqnegahdar@gmail.com" style="color: #FF8A3D; text-decoration: none;">mhaqnegahdar@gmail.com</a>
              </p>
            </td>
          </tr>
          
          <!-- Brand Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 13px; color: #9CA3AF;">
                SaaSWayz - Voice-first product planning
              </p>
              <p style="margin: 0; font-size: 12px; color: #D1D5DB;">
                © 2024 SaaSWayz. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
        
        <!-- Bottom Spacer -->
        <table role="presentation" style="width: 100%; max-width: 600px; margin-top: 20px;">
          <tr>
            <td style="text-align: center; padding: 0 20px;">
              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #9CA3AF;">
                You're receiving this email because a password reset was requested for your account.
              </p>
            </td>
          </tr>
        </table>
        
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Send password reset email
export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  return sendEmail({
    to,
    subject: "Reset your SaaSWayz password",
    html: getPasswordResetEmailHTML(resetUrl),
  });
}
