"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleClick = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="w-6 h-6" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="w-6 h-6" />
      </Button>
    </div>
  );
}
