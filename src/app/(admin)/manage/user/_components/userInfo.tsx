"use client";

import deleteExpirableGuests from "@/app/(admin)/actions/deleteExpirableGuests";
import getExpirableGuests from "@/app/(admin)/actions/getExpirableGuests";
import { UserType } from "@/app/(admin)/actions/getUsers";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import React from "react";

const UserInfo = ({ users }: { users: UserType }) => {
  const router = useRouter();
  const handleDeleteGuests = async () => {
    try {
      const expirableGuestsResult = await getExpirableGuests();
      if (expirableGuestsResult.success) {
        const { expirableGuests } = expirableGuestsResult;
        if (expirableGuests.length === 0) {
          alert("삭제할 게스트 계정이 없습니다.");
          return;
        }
        const expirableGuestsIds = expirableGuests.map((guest) => guest.id);
        // prettier-ignore
        if (confirm(`${expirableGuestsIds.length}명의 게스트 계정을 삭제하시겠습니까?`)){
              const deleteExpirableGuestsResult = await deleteExpirableGuests(expirableGuestsIds);
              if(deleteExpirableGuestsResult?.success){
                alert("게스트 계정 삭제를 완료하였습니다.");
                router.refresh();
              } else{
                alert("게스트 계정 삭제에 실패했습니다.")
              }
            }
      } else {
        alert("게스트 계정 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.log("Error: 게스트계정 삭제 에러", error);
      alert("게스트 계정 삭제에 실패했습니다.");
    }
  };
  return (
    <>
      <div className="py-4">
        <button
          onClick={handleDeleteGuests}
          className="bg-slate-300 p-4 text-red-600"
        >
          게스트계정 일괄삭제
        </button>
        <div className="text-gray-500">
          *최근 방문일 3일 지난 게스트계정을 삭제합니다
        </div>
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
              <tr key={user.id} className="divide-x [&>td]:py-2">
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
    </>
  );
};

export default UserInfo;
