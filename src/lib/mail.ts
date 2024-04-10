import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "confirm@bartoszsobina.xyz",
    to: email,
    subject: "Confirm your account",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm account in nextcraft</p>`,
  });
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "reset@bartoszsobina.xyz",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password in nextcraft</p>`,
  });
}
