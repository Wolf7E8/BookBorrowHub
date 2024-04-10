import { Navbar } from "./_components/navbar";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
      <Navbar />
      {children}
    </div>
  );
}
