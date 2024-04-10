import { FaExclamationTriangle } from "react-icons/fa";

type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className="bg-destructive/40 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive ">
      <FaExclamationTriangle className="w-6 h-6" />
      <p>{message}</p>
    </div>
  );
}
