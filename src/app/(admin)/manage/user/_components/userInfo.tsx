"use client";

import deleteExpirableGuests from "@/app/(admin)/actions/deleteExpirableGuests";
import getExpirableGuests from "@/app/(admin)/actions/getExpirableGuests";
import { UserType } from "@/app/(admin)/actions/getUsers";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import React from "react";
import Table, { RowData } from "../../_components/table";
import Card from "../../_components/card";

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

  const headers = [
    "ID",
    "고객명",
    "로그인ID",
    "이메일",
    "전화번호",
    "가입일",
    "최근 방문일",
  ];
  const data : RowData [][]= users.map((user) => [
    [user.id, "text-center"],
    [user.username, "whitespace-nowrap"],
    [user.loginId, "whitespace-nowrap"],
    [user.email, "whitespace-nowrap"],
    [user.phone, "whitespace-nowrap"],
    [formatDate(user.created_at), ""],
    [
      user.logs.map((log) => (
        <div key={log.id}>{formatDate(log.created_at)}</div>
      )),
      "text-left",
    ],
  ]);

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

      <div className="mx-auto  max-w-screen-xl pt-8 ">
        <h1 className="text-xl font-bold">유저 리스트</h1>
        <div className="pt-4">
          <div className="hidden lg:block">
            <Table headers={headers} data={data} />
          </div>
          <div className="block lg:hidden">
            <Card headers={headers} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
