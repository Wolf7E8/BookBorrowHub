"use state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { UserNewAvatar } from "./user-new-avatar";
import { FaUser } from "react-icons/fa";

type UserAvatarProps = {
  avatarUrl?: string | null;
};

export function UserAvatar({ avatarUrl }: UserAvatarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(avatarUrl || "");

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <div className="relative w-fit mb-10">
        <Avatar className="h-28  w-28">
          <AvatarImage src={userAvatar || ""} />
          <AvatarFallback>
            <FaUser className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
        <DialogTrigger asChild>
          <button
            onClick={() => setModalOpen(true)}
            className="absolute -bottom-6 left-0 right-0 m-auto bg-muted p-2 rounded-full border border-muted-foreground hover:opacity-80 transition-all"
          >
            <PencilIcon className="w-6 h-6" />
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
