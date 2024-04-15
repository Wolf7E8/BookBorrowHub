import { UserButton } from "@/components/auth/user-button";
import { Notifications } from "@/components/notifications";
import { Book } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-background brightness-125 flex justify-between items-center p-3 rounded-xl w-3/4  border border-purple-500/50 transition-all hover:border-purple-500/90 mb-8">
      <Link href="/" className="flex items-center gap-x-2 font-bold">
        <Book className="w-10 h-10  text-indigo-500 " />
        <h1 className="font-bold text-2xl text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:underline hover:underline-offset-3 decoration-indigo-500">
          BookBorrowHub
        </h1>
      </Link>
      <div className="flex gap-x-4">
        <Notifications />
        <UserButton />
      </div>
    </nav>
  );
}
