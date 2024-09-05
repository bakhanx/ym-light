import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#010315] text-white">
      <div className="mx-auto flex max-w-screen-2xl flex-col sm:px-10 px-4 py-10">
        <div className="flex flex-col justify-between gap-y-4 md:flex-row">
          <div>
            <p className="pb-1 font-bold">CUSTOMER CENTER</p>
            <div className="text-sm text-gray-300">0000-0000</div>
            <table className="mt-2 text-gray-300">
              <tbody>
                <tr className="text-left text-sm">
                  <th className="">평일</th>
                  <th className="pl-4">휴일</th>
                </tr>
                <tr className="text-sm font-bold">
                  <td>09:00 ~ 18:00</td>
                  <td className="pl-4">10:00 ~ 15:00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <p className="pb-1 font-bold">COMPANY</p>
            <ul className="flex flex-col gap-y-1 text-sm text-gray-300">
              <li>법인명(상호) : 영맨조명</li>
              <li>
                <div className="flex">
                  <span>대표 : 박홍섭</span>
                  <span className="px-2">|</span>
                  <span>개인정보관리자 : 박한솔</span>
                </div>
              </li>
              <li>이메일 : ymlight@gmail.com</li>
              <li>전화 : 0000-0000</li>
              <li>팩스 : 02-0000-0000</li>
              <li>사업자등록번호 : 000-00-00000</li>

              <li>통신판매신고번호 제 2024-서울-0000호</li>
            </ul>
          </div>

          {/* <div>
        <p className="font-bold">ADDRESS</p>
        <ul className="text-sm text-gray-300">
          <li>위치:서울특별시 도봉구 길동로 11-11</li>
        </ul>
      </div> */}

          <div>
            <p className="pb-1 font-bold">BANK INFO</p>
            <ul className="text-sm text-gray-300">
              <li>예금주 : 영맨조명 박홍섭</li>
              <li>영맨은행 122-333-00000</li>
            </ul>
          </div>
        </div>

        <div className="pt-10">
          <p className="flex flex-col text-sm text-gray-300">
            <span>
              Copyright © (c) <strong>ymlight.com</strong>
            </span>
            <span>All rights reserved. | 호스팅사업자 : 와이엠라이트</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
