import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

export function UserInfo({ user, label }: UserInfoProps) {
  return (
    <Card className="w-2/3 ">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <div className="flex flex-row items-center  justify-between  rounded-xl border p-3 shadow-md">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs font-mono rounded-md">{user?.id}</p>
        </div>
        <div className="flex flex-row items-center  justify-between  rounded-xl border p-3 shadow-md">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs font-mono rounded-md">{user?.name}</p>
        </div>
        <div className="flex flex-row items-center  justify-between  rounded-xl border p-3 shadow-md">
          <p className="text-sm font-medium">Image</p>
          <p className="truncate text-xs font-mono rounded-md">{user?.image}</p>
        </div>
        <div className="flex flex-row items-center  justify-between  rounded-xl border p-3 shadow-md">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs font-mono rounded-md">{user?.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
