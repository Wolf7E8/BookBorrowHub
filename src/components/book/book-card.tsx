"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { BookButtons } from "./book-buttons";

type BookCardProps = {
  canEdit: boolean;
};

export function BookCard({ canEdit }: BookCardProps) {
  const [hidden, setHidden] = useState(true);

  return (
    <Card
      className="text-center"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <CardHeader className="space-y-4">
        <CardTitle className="text-xl">Building a Second Brain</CardTitle>
        <CardDescription className="text-xs">
          A Proven Method to Organise Your Digital Life and Unlock Your Creative
          Potential
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Image src="/cover-example.jpg" width="100" height="50" alt="book" />
      </CardContent>
      {canEdit && (
        <CardFooter>
          {hidden === false ? (
            <div className="h-10 flex w-full justify-center gap-x-4">
              <BookButtons />
            </div>
          ) : (
            <div className="h-10 invisible"></div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
