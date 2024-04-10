import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <LoginButton mode="redirect" asChild>
      <Button variant="default" className="rounded px-4">
        Sign In
      </Button>
    </LoginButton>
  );
}
