import { BrevoClient } from "@getbrevo/brevo";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string,
) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey) throw new Error("BREVO_API_KEY is not configured");
  if (!senderEmail) throw new Error("BREVO_SENDER_EMAIL is not configured");

  const brevo = new BrevoClient({ apiKey });

  return brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "Opal",
      email: senderEmail,
    },
    to: [{ email: to }],
    subject,
    textContent: text,
    ...(html && { htmlContent: html }),
  });
};
