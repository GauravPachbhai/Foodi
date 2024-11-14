import {resend} from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";

export async function sendVerificationEmail(
    email,
    username,
    verifyCode
) {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Foodi | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
          });
        //   console.log('Verification email sent successfully.' )
          return { success: true, message: 'Verification email sent successfully.' };
    } catch (error) {
        console.error(" Error Sending Verification Email: ", error);
        return {success: false, message: 'Failed to send verification Email'}
    }
}