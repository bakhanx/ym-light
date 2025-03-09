"use client";

import Link from "next/link";

const companyInfoData = [
  { label: "법인명(상호)", value: "영맨조명" },
  { label: "대표", value: "박홍섭", extra: "개인정보관리자 : 박한솔" },
  { label: "이메일", value: "ymlight@gmail.com" },
  { label: "전화", value: "0000-0000" },
  { label: "팩스", value: "02-0000-0000" },
  { label: "사업자등록번호", value: "000-00-00000" },
  { label: "통신판매신고번호", value: "제 2024-서울-0000호" },
];

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="pb-1 font-bold text-white">{children}</h1>
);

const CustomerCenter = () => (
  <section>
    <Title>CUSTOMER CENTER</Title>
    <p>0000-0000</p>
    <p className="mt-2">
      평일: <span className="font-bold">09:00 ~ 18:00</span> | 휴일:{" "}
      <span className="font-bold">10:00 ~ 15:00</span>
    </p>
  </section>
);

const CompanyInfo = () => (
  <section>
    <Title>COMPANY</Title>
    <ul>
      {companyInfoData.map((item) => (
        <li key={item.value} className="flex gap-2">
          <span>
            {item.label} : {item.value}
          </span>
          {item.extra && <span>| {item.extra}</span>}
        </li>
      ))}
    </ul>
  </section>
);

const BankInfo = () => (
  <section>
    <Title>BANK INFO</Title>
    <ul>
      <li>예금주 : 영맨조명 박홍섭</li>
      <li>영맨은행 122-333-00000</li>
    </ul>
  </section>
);

const CopyrightSection = () => (
  <section className="pt-10 text-sm text-gray-300">
    <p>
      Copyright © (c) <strong>ymlight.com</strong>
    </p>
    <p>All rights reserved. | 호스팅사업자 : 와이엠라이트</p>
  </section>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#010315] text-white">
      <div className="mx-auto max-w-screen-xl px-2 py-10 sm:px-4 xl:px-0">
        <div className="flex flex-col justify-between gap-4 text-sm text-gray-300 md:flex-row">
          <CustomerCenter />
          <CompanyInfo />
          <BankInfo />
        </div>
        <CopyrightSection />
      </div>
    </footer>
  );
}
