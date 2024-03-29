import React from "react";

type FormButtonType = {
  name: string;
  loading: boolean;
};
const FormButton = ({ name, loading }: FormButtonType) => {
  return (
    <button disabled={loading} className="w-full rounded-md bg-amber-500 p-4 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-wait">
      {loading ? "로딩중..." : name}
    </button>
  );
};

export default FormButton;
