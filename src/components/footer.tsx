"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[#010315] text-white">
      <div className="mx-auto max-w-screen-xl px-2 py-10 sm:px-4 xl:px-0">
        <div className="flex flex-col justify-between gap-4 text-sm text-gray-300 md:flex-row">
          {/* CUSTOMER CENTER */}
          <div>
            <p className="pb-1 font-bold text-white">CUSTOMER CENTER</p>
            <p>0000-0000</p>
            <p className="mt-2">
              평일: <span className="font-bold">09:00 ~ 18:00</span> | 휴일:{" "}
              <span className="font-bold">10:00 ~ 15:00</span>
            </p>
          </div>

          {/* COMPANY INFO */}
          <div>
            <p className="pb-1 font-bold text-white">COMPANY</p>
            <ul>
              <li>법인명(상호) : 영맨조명</li>
              <li className="flex gap-2">
                <span>대표 : 박홍섭</span>
                <span>|</span>
                <span>개인정보관리자 : 박한솔</span>
              </li>
              <li>
                이메일:{" "}
                <a href="mailto:ymlight@gmail.com" className="text-gray-400">
                  ymlight@gmail.com
                </a>
              </li>
              <li>전화 : 0000-0000</li>
              <li>팩스 : 02-0000-0000</li>
              <li>사업자등록번호 : 000-00-00000</li>
              <li>통신판매신고번호 제 2024-서울-0000호</li>
            </ul>
          </div>

          {/* BANK INFO */}
          <div>
            <p className="pb-1 font-bold text-white">BANK INFO</p>
            <ul>
              <li>예금주 : 영맨조명 박홍섭</li>
              <li>영맨은행 122-333-00000</li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-10 text-sm text-gray-300">
          <p>
            Copyright © (c) <strong>ymlight.com</strong>
          </p>
          <p>All rights reserved. | 호스팅사업자 : 와이엠라이트</p>
        </div>
      </div>
    </footer>
  );
}
