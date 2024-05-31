"use client";

const DeleteForm = ({
  id,
  action,
}: {
  id: number;
  action: (id: number) => Promise<void>;
}) => {
  const handleClickButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm("삭제 하시겠습니까?")) {
      await action(id);
    }
  };
  return (
    <form onSubmit={handleClickButton}>
      <input className="hidden" name="id" value={id} readOnly />
      <button className="bg-red-600 p-2 text-white">삭제</button>
    </form>
  );
};

export default DeleteForm;
