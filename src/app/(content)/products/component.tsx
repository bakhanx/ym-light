"use client"

import React from "react";
import { useFormState } from "react-dom";

const AddBtn = () => {

  const increment = async (prev: any, formData: FormData) => {
    return prev + 1;
  };
  const [state, formAction] = useFormState(increment, 0);
  return (
    <div>
      <form action="">
        {state}
        <button formAction={formAction}>Increment</button>

        <input type="number" />
      </form>
    </div>
  );
};

export default AddBtn;
