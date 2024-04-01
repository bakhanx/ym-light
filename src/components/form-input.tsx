import React from "react";
import { text } from "stream/consumers";

type FormInputType = {
  label: string;
  type: string;
  name:string;
  placeholder: string;
  error?: string[];
  requried?: boolean;
  textarea?: boolean;
  
};

const FormInput = ({
  label,
  type,
  placeholder,
  error = [],
  name,
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
          name={name}
            required={requried}
            className="h-28 resize-none rounded-sm p-2 text-black focus:outline-none focus:ring-4 transition focus:ring-amber-500"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            name={name}
            required={requried}
            placeholder={placeholder}
            className="rounded-sm p-2 text-black focus:outline-none focus:ring-4 transition focus:ring-amber-500"
          />
        )}
        <span className="w-full text-amber-500">{error}</span>
      </label>
    </div>
  );
};

export default FormInput;
