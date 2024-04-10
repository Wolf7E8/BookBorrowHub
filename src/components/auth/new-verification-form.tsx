"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { newVerificationAction } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-sucess";

export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [sucess, setSucess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const data = await newVerificationAction(token);
      setError(data.error);
      setSucess(data.sucess);
    } catch {
      setError("Something went wrong!");
    }
  }, [token]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex items-center justify-center">
        {!sucess && !error ? <BeatLoader color="#fff" /> : null}
        <FormSucess message={sucess} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}
