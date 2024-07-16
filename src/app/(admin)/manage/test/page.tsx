import React from "react";

const TestPage = () => {
  const a = undefined;
  return (
    <div className="p-5">
      <div className="py-10">테스트 페이지</div>
      {a ?? 2}
    </div>
  );
};

export default TestPage;
