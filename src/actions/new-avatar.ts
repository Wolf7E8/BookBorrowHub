"use server";

import fs from "fs/promises";
import path from "path";
import { getUserById, updateUserImage } from "@/database/user";
import { v4 as uuidv4 } from "uuid";

const PROJECT_DIR = process.env.PROJECT_DIR;
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function newAvatarAction(
  base64Data: string,
  userId: string | undefined,
) {
  if (!PROJECT_DIR) {
    return { error: "Something went wrong!" };
  }
  if (!base64Data) {
    return { error: "Not image found!" };
  }
  if (!userId) {
    return { error: "User not found!" };
  }

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "User not found!" };
  }

  const base64Content = base64Data.split(";base64,").pop();
  if (!base64Content) {
    return { error: "Something went wrong!" };
  }

  const uniqueId = uuidv4();
  const filePath = path.join(
    PROJECT_DIR,
    "public",
    "avatars",
    `${uniqueId}.png`,
  );

  try {
    await fs.writeFile(filePath, base64Content, "base64");
    const imageSrc = `${NEXT_PUBLIC_APP_URL}/avatars/${uniqueId}.png`;
    await updateUserImage(existingUser.id, imageSrc);
  } catch {
    return { error: "Something went wrong!" };
  }

  const oldImage = existingUser.image;

  if (oldImage) {
    const imagePath = oldImage.split("/");
    if (imagePath[imagePath.length - 2] === "avatars") {
      const imageSrc = imagePath[imagePath.length - 1];
      const filePath = path.join(PROJECT_DIR, "public", "avatars", imageSrc);
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return { success: "Your profile picture was updated!" };
}
