"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { UserNewAvatar } from "./user-new-avatar";
import { FaUser } from "react-icons/fa";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  canEdit: boolean;
  avatarUrl?: string | null;
  className?: string;
};

export function UserAvatar({ canEdit, avatarUrl, className }: UserAvatarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(avatarUrl || "");

  if (!canEdit) {
    return (
      <div className="relative w-fit mb-10">
        <Avatar className={cn("h-20  w-20", className)}>
          <AvatarImage src={userAvatar || ""} />
          <AvatarFallback>
            <FaUser className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <div className="relative w-fit mb-10">
        <Avatar className={cn("h-20  w-20", className)}>
          <AvatarImage src={userAvatar || ""} />
          <AvatarFallback>
            <FaUser className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
        <DialogTrigger asChild>
          <button
            onClick={() => setModalOpen(true)}
            className="absolute -bottom-4 left-0 right-0 m-auto bg-muted p-2 rounded-full border border-muted-foreground hover:opacity-80 transition-all"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <UserNewAvatar
          closeModal={() => setModalOpen(false)}
          setNewAvatar={setUserAvatar}
        />
      </DialogContent>
    </Dialog>
  );
}
