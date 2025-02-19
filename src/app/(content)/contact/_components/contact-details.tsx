import InfoBlock from "./info-block";

const ContactDetails = () => {
  return (
    <section>
      <h2 className="text-xl font-bold sm:text-3xl">Points of Contact</h2>
      <div className="flex flex-col gap-y-3 pt-6">
        <InfoBlock
          title="Address | South Korea."
          desc="서울특별시 도봉구 길동로 123 1층"
        />
        <InfoBlock title="FAX" desc="(02)-000-0000" />
        <InfoBlock title="Email" desc="ymlight@gmail.com" />
        <InfoBlock title="페이지 관리자" desc="bkndev7@gmail.com" />
      </div>
    </section>
  );
};

export default ContactDetails