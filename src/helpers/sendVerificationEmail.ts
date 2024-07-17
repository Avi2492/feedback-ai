// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse> {
//   try {
//     await resend.emails.send({
//       from: "replibot.ai <onboarding@resend.dev>",
//       to: email,
//       subject: "RepliBot | Verification Code",
//       react: VerificationEmail({ username, otp: verifyCode }),
//     });

//     // console.log("Send Mail OTP" + data);

//     return { success: true, message: "Success to send verification email" };
//   } catch (emailError) {
//     console.log("Email Failed", emailError);
//     return { success: false, message: "Failed to send verification email" };
//   }
// }

import nodemailer from "nodemailer";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/components";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Render the email content using @react-email/components
    const emailHtml = render(VerificationEmail({ username, otp: verifyCode }));

    await transporter.sendMail({
      from: '"replibot.ai" <onboarding@replibot.ai>', // sender address
      to: email, // list of receivers
      subject: "RepliBot | Verification Code", // Subject line
      html: emailHtml, // html body
    });

    return { success: true, message: "Success to send verification email" };
  } catch (emailError) {
    console.log("Email Failed", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
