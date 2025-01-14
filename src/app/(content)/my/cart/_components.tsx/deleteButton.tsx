import { TrashIcon } from "@heroicons/react/16/solid";
import React from "react";

const DeleteButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center rounded-md border-2 p-1 text-gray-600"
    >
      <span>
        <TrashIcon className="h-4 w-4" />
      </span>
      <span>선택삭제</span>
    </button>
  );
};

export default DeleteButton;
