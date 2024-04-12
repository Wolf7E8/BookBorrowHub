import { getProfileByUserId } from "@/database/profile";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  // const profile = await getProfileByUserId(userId);
  // if (!profile) {
  //   return notFound();
  // }

  return <section>profile: {userId}</section>;
}
