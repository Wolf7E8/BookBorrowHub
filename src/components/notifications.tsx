import { Bell } from "lucide-react";
import { Button } from "./ui/button";

export function Notifications() {
  return (
    <Button variant="ghost">
      <Bell className="w-7 h-7" />
    </Button>
  );
}
