import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FormInputType = {
  name: string;
  label: string;
  error?: string[];
  textarea?: boolean;
};

const FormInput = ({
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
        <div className="flex gap-x-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </div>

        {textarea ? (
          <textarea
            name={name}
            required={required}
            className="h-28 resize-none rounded-sm p-2 text-black transition focus:outline-none focus:ring-4 focus:ring-amber-500"
            {...rest}
          />
        ) : (
          <input
            name={name}
            required={required}
            className="rounded-sm p-2 text-black transition focus:outline-none focus:ring-4 focus:ring-amber-500"
            {...rest}
          />
        )}
        <span className="w-full text-amber-500">{error}</span>
      </label>
    </div>
  );
};

export default FormInput;
