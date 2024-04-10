import { FaExclamationTriangle } from "react-icons/fa";
import { CardWrapper } from "./card-wrapper";

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Ooops! Something went wrong"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <FaExclamationTriangle className="flex w-full justify-center items-center text-destructive brightness-125  h-6" />
    </CardWrapper>
  );
}
