import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProPlan() {
  return (
    <div className="relative flex flex-col p-6 bg-primary-foreground shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
      <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Popular
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center">Pro</h3>
        <div className="mt-4 text-center">
          <span className="text-4xl font-bold">$59</span>/ month
        </div>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-x-2">
            <Check className="text-green-500 w-10 h-10" />
            <span>Unlimited Cards</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Check className="text-green-500 w-10 h-10" />
            <span>Unlimited Boards</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Check className="text-green-500 w-10 h-10" />
            <span>Store larger files, up to 250 MB each</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Check className="text-green-500 w-10 h-10" />
            <span>Streamline your workflow with saved searches</span>
          </li>
        </ul>
      </div>
      <div className="mt-6">
        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:brightness-150">
          Get Started
        </Button>
      </div>
    </div>
  );
}
