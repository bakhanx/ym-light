"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type FormButtonType = {
  name?: string;
  color?: string;
  isEdit?: boolean;
};
const FormButton = ({ name, color, isEdit }: FormButtonType) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="flex w-full items-center justify-center gap-x-1 rounded-md bg-amber-300 p-5 font-semibold hover:bg-amber-400"
    >
      {name} &nbsp;
      {isEdit
        ? pending
          ? "수정중..."
          : "수정하기"
        : pending
          ? "등록중..."
          : "등록하기"}
    </button>
  );
};

export default FormButton;
