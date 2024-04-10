"use client";

import { logoutAction } from "@/actions/logout";

type LogoutButtonProps = {
  children?: React.ReactNode;
};

export function LogoutButton({ children }: LogoutButtonProps) {
  const handleClick = () => {
    logoutAction();
  };
  return (
    <span onClick={handleClick} className="hover:cursor-pointer">
      {children}
    </span>
  );
}
