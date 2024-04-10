"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-2/3 shadow-md">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathName === "/settings" ? "default" : "outline"}
          className="rounded py-1"
        >
          <Link href="/settings">Settings</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/server" ? "default" : "outline"}
          className="rounded py-3"
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/client" ? "default" : "outline"}
          className="rounded py-3"
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/admin" ? "default" : "outline"}
          className="rounded py-3"
        >
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
}
