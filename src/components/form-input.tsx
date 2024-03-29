import React from "react";
import { text } from "stream/consumers";

type FormInputType = {
  label: string;
  type: string;
  placeholder: string;
  error: string;
  requried?: boolean;
  textarea?: boolean;
};

const FormInput = ({
  label,
  type,
  placeholder,
  error,
  requried = false,
  textarea = false,
}: FormInputType) => {
  return (
    <div>
      <label className="flex flex-col">
        <div className="flex gap-x-1">
          {label}
          {requried && <span className="text-red-500">*</span>}
        </div>

        {textarea ? (
          <textarea
            required={requried}
            className="h-28 resize-none rounded-sm p-2 text-black focus:outline-none focus:ring-4 transition focus:ring-amber-500"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            required={requried}
            placeholder={placeholder}
            className="rounded-sm p-2 text-black focus:outline-none focus:ring-4 transition focus:ring-amber-500"
          />
        )}
        <span className="hidden h-10 w-full text-amber-500">{error}</span>
      </label>
    </div>
  );
};

export default FormInput;
