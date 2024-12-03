"use client";
import { useFormStatus } from "react-dom";
import Loader from "./loader";
import PreventScroll from "../utils/preventScroll";

type FormButtonType = {
  name?: string;
  color?: string;
};
const FormButton = ({ name, color }: FormButtonType) => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        disabled={pending}
        className="flex w-full items-center justify-center gap-x-1 rounded-md bg-amber-400 p-5 font-semibold hover:bg-amber-500"
      >
        {pending ? "처리중..." : name}
      </button>

      {pending && (
        <div className="fixed left-0 top-0 h-full w-full bg-black opacity-50 z-loader">
          <Loader />
          <PreventScroll />
        </div>
      )}
    </>
  );
};

export default FormButton;
