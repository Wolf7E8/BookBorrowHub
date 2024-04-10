import { db } from "@/lib/db";
import * as z from "zod";
import { SettingsSchema } from "@/schemas";

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export async function getUserById(userId?: string) {
  return await db.user.findUnique({ where: { id: userId } });
}

export async function createUser(
  email?: string,
  name?: string,
  password?: string,
) {
  return await db.user.create({
    data: {
      email,
      name,
      password,
    },
  });
}

export async function verifyUser(userId: string, email: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      email: email,
      emailVerified: new Date(),
    },
  });
}

export async function updateUserPassword(userId: string, newPassword: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      password: newPassword,
    },
  });
}

export async function updateUserImage(userId: string, newImage: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      image: newImage,
    },
  });
}

export async function updateUser(
  userId: string,
  values: z.infer<typeof SettingsSchema>,
) {
  await db.user.update({
    where: { id: userId },
    data: {
      ...values,
    },
  });
}
