import { Navbar } from "./_components/navbar";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <section className="h-screen w-full  flex flex-col gap-y-5 items-center py-10 ">
      <Navbar />
      {children}
    </section>
  );
}
