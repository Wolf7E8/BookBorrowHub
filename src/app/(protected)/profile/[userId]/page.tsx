import { auth } from "@/auth";
import { BookCard } from "@/components/book/book-card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { getUserById } from "@/database/user";
import { MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  const session = await auth();
  const user = await getUserById(userId);

  const canEdit = session?.user.id === user?.id;

  if (!user) {
    notFound();
  }

  return (
    <section className="flex flex-col w-3/4 pl-5 gap-y-14">
      <div className="flex gap-x-16 w-full py-8">
        <UserAvatar
          canEdit={canEdit}
          className="w-36 h-36"
          avatarUrl={user?.image}
        />
        <div className="space-y-5">
          <h1 className="font-bold text-4xl">{user.name}</h1>
          <p className="w-1/2">
            I'm constantly swapping novels with fellow readers, chatting about
            plot twists, and discovering hidden gems.
          </p>
          <Button variant="link" className="flex px-0 items-center gap-x-4">
            <MessageCircle className="w-10 h-10" />
            Send a message
          </Button>
        </div>
      </div>
      <section className="space-y-5 w-full">
        <h2 className="font-bold text-3xl">I'm looking for</h2>
        <div className="grid grid-cols-3 gap-6">
          <BookCard canEdit={canEdit} />
          <BookCard canEdit={canEdit} />
          <BookCard canEdit={canEdit} />
        </div>
      </section>
      <section className="space-y-5">
        <h2 className="font-bold text-3xl">I want to trade</h2>
        <div className="grid grid-cols-4"></div>
      </section>
    </section>
  );
}
