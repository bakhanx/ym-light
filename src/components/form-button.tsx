"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type FormButtonType = {
  name?: string;
  color?: string;
  isEdit?: boolean;
};
const FormButton = ({ name, color }: FormButtonType) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="flex w-full items-center justify-center gap-x-1 rounded-md bg-amber-400 p-5 font-semibold hover:bg-amber-500"
    >
      {name}
      {pending && "처리중..."}
    </button>
  );
};

export default FormButton;
