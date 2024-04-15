import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-md text-gray-500 dark:text-gray-400">
        © 2024 BookBorrowHub. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-md hover:underline underline-offset-4"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-md hover:underline underline-offset-4"
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className="text-md hover:underline underline-offset-4"
          href="/terms-of-service"
        >
          Terms of Service
        </Link>
      </nav>
    </footer>
  );
}
