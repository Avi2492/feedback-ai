import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "replibot.ai <onboarding@resend.dev>",
      to: email,
      subject: "RepliBot | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    // console.log("Send Mail OTP" + data);

    return { success: true, message: "Success to send verification email" };
  } catch (emailError) {
    console.log("Email Failed", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
