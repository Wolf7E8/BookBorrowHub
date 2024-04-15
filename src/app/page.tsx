import Link from "next/link";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { Footer } from "./_components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="px-5 mx-auto lg:px-6 pt-10 flex flex-col gap-y-4 sm:flex-row w-full justify-between items-center">
        <Link className="flex items-center justify-cente" href="#">
          <Book className="sm:w-12 sm:h-12 w-7 h-7  text-indigo-500 " />
          <h1 className="pl-4 font-bold text-2xl sm:text-3xl  text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            BookBorrowHub
          </h1>
        </Link>
        <LoginButton mode="redirect" asChild>
          <Button variant="default" className="rounded px-4">
            Sign In
          </Button>
        </LoginButton>
      </header>
      <section className="w-full px-5 py-6 md:py-12 lg:py-24 xl:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
            <div className="flex flex-col justify-center space-y-2">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Exchange your books with the community
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Share your favorite stories and discover new ones by trading
                  books with fellow readers.
                </p>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </div>
            <Image
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="310"
              src="/book.jpeg"
              width="550"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
