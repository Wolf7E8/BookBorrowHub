import { auth } from "@/auth";
import { UserInfo } from "@/components/user-info";

export default async function ServerPage() {
  const session = await auth();

  return <UserInfo label="Server Component" user={session?.user} />;
}
