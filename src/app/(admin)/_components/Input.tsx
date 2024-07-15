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
      <label className="flex flex-col">
        <div className="flex">
          <div className="flex w-32 gap-x-1 p-2">
            {label}
            {required && <span className="text-red-500">*</span>}
          </div>

          {textarea ? (
            <textarea
              name={name}
              required={required}
              className="h-16 w-full resize-none rounded-sm border-2 border-gray-400 p-2 text-black transition  focus:outline-none focus:ring-2 focus:ring-amber-500"
              {...rest}
            />
          ) : (
            <input
              name={name}
              required={required}
              className="w-full rounded-sm border-2 border-gray-400 p-2 text-black transition focus:outline-none focus:ring-2 focus:ring-amber-500 "
              {...rest}
            />
          )}
        </div>
        <span className="pl-2 text-red-500">{error}</span>
      </label>
    </div>
  );
};

export default Input;
