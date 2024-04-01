"use client"

import React from "react";
import { useFormStatus } from "react-dom";

type FormButtonType = {
  name: string;
};
const FormButton = ({ name }: FormButtonType) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full rounded-md bg-amber-500 p-4 disabled:cursor-wait disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "로딩중..." : name}
    </button>
  );
};

export default FormButton;
