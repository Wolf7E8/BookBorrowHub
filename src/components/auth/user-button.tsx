"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import { BookOpen, MessageCircle, SettingsIcon, User } from "lucide-react";

export function UserButton() {
  const user = useCurrentUser();
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="">
            <FaUser className="w-7 h-7" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-48">
        <DropdownMenuItem className="py-3">
          <Link href="/offerts" className="flex gap-x-2 cursor-pointer">
            <BookOpen className="w-5 h-5" />
            Offerts
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3">
          <Link
            href={`/profile/${user.id}`}
            className="flex gap-x-2 cursor-pointer"
          >
            <User className="w-5 h-5" />
            My profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3">
          <Link href="/chats" className="flex gap-x-2 cursor-pointer">
            <MessageCircle className="w-5 h-5" />
            Chat
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3">
          <Link href="/settings" className="flex gap-x-2 cursor-pointer">
            <SettingsIcon className="w-5 h-5" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3">
          <LogoutButton>
            <ExitIcon className="w-5 h-5" /> Logout
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
