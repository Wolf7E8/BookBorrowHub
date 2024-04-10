"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/database/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function registerAction(formData: z.infer<typeof RegisterSchema>) {
  const validatedFormData = RegisterSchema.safeParse(formData);

  if (!validatedFormData.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFormData.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User with this email already exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser(email, name, hashedPassword);

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { sucess: "Confirmation email sent!" };
}
