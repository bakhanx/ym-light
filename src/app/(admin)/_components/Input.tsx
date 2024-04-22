import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FormInputType = {
  name: string;
  label: string;
  error?: string[];
  textarea?: boolean;
};

const Input = ({
  label,
  name,
  error = [],
  required = false,
  textarea = false,
  ...rest
}: FormInputType &
  InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div>
      <label className="flex">
        <div className="flex gap-x-1 p-2 w-32">
          {label}
          {required && <span className="text-red-500">*</span>}
        </div>

        {textarea ? (
          <textarea
            name={name}
            required={required}
            className="h-16 resize-none rounded-sm p-2 text-black transition focus:outline-none focus:ring-2 focus:ring-amber-500  w-full border-2 border-gray-400"
            {...rest}
          />
        ) : (
          <input
            name={name}
            required={required}
            className="rounded-sm p-2 text-black transition focus:outline-none focus:ring-2 focus:ring-amber-500 w-full border-2 border-gray-400 "
            {...rest}
          />
        )}
        {/* <span className="w-full text-blue-500">{error}</span> */}
      </label>
    </div>
  );
};

export default Input;
