"use client"

import React from "react";
import { useFormStatus } from "react-dom";

type FormButtonType = {
  name: string;
  color? : string
};
const FormButton = ({ name, color }: FormButtonType) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full rounded-md bg-amber-300 p-4 disabled:cursor-wait disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "로딩중..." : name}
    </button>
  );
};

export default FormButton;
