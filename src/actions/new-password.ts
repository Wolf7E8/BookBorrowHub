"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import {
  getPasswordResetTokenByToken,
  removePasswordResetTokenById,
} from "@/database/password-reset-token";
import { getUserByEmail, updateUserPassword } from "@/database/user";

export async function newPasswordAction(
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
) {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Passwords do not match!" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const { password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await updateUserPassword(existingUser.id, hashedPassword);
  await removePasswordResetTokenById(existingToken.id);

  return { sucess: "Your password updated!" };
}
