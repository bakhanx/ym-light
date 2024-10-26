import db from "@/utils/db";
import { formatDate } from "@/utils/formatDate";
import React from "react";
import getUsers from "../../actions/getUsers";

const User = async () => {
  const users = await getUsers();

  return (
    <div className="min-h-screen px-2">
      <h1 className="pt-24">유저관리페이지</h1>
      <div className="py-4">
        <button className="p-4 bg-slate-300 text-red-600">게스트계정 일괄삭제</button>
        <div className="text-gray-500">*최근 방문일 3일 지난 게스트계정을 삭제합니다</div>
      </div>
      <div>총 유저수 : {users.length}</div>
      <div className="py-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>ID</th>
              <th>고객명</th>
              <th>로그인ID</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>가입일</th>
              <th>최근 방문일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user.id} className="[&>td]:py-2 divide-x">
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.loginId}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{formatDate(user.created_at)}</td>
                <td>
                  {user.logs.map((log) => (
                    <div key={log.id}>{formatDate(log.created_at)}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
