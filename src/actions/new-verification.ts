"use server";

import { getUserByEmail, verifyUser } from "@/database/user";
import {
  getVerificationTokenByToken,
  removeVerificationTokenById,
} from "@/database/verification-token";

export async function newVerificationAction(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await verifyUser(existingUser.id, existingToken.email);
  await removeVerificationTokenById(existingToken.id);

  return { sucess: "Email verified!" };
}
