import React from "react";
import getUsers from "../../actions/getUsers";
import UserInfo from "./_components/userInfo";

const User = async () => {
  const users = await getUsers();

  return (
    <div className="min-h-screen px-2">
      <h1 className="pt-24">유저관리페이지</h1>
      <UserInfo users={users} />
    </div>
  );
};

export default User;
