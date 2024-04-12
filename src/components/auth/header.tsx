import { Book } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  label: string;
};

export function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <Link href="/" className="flex gap-x-2 items-center cursor-pointer">
        <Book className="w-7 h-7  text-indigo-500 " />
        <h1 className="font-bold text-xl text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:underline decoration-indigo-500">
          BookBorrowHub
        </h1>
      </Link>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
