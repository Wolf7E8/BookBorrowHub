import { FaCheckCircle } from "react-icons/fa";
type FormSucessProps = {
  message?: string;
};

export function FormSucess({ message }: FormSucessProps) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/40 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 ">
      <FaCheckCircle className="w-6 h-6" />
      <p>{message}</p>
    </div>
  );
}
