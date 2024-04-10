import {
  createVerificationToken,
  getVerificationTokenByEmail,
  removeVerificationTokenById,
} from "@/database/verification-token";
import {
  createPasswordResetToken,
  getPasswordResetTokenByEmail,
  removPasswordResetTokenById,
} from "@/database/password-reset-token";
import { v4 as uuidv4 } from "uuid";

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await removPasswordResetTokenById(existingToken.id);
  }

  const passwordResetToken = await createPasswordResetToken(
    email,
    token,
    expires,
  );

  return passwordResetToken;
}

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await removeVerificationTokenById(existingToken.id);
  }

  const verificationToken = await createVerificationToken(
    email,
    token,
    expires,
  );

  return verificationToken;
}
