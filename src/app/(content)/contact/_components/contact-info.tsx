import InfoBlock from "./info-block";

const ContactInfo = () => {
  return (
    <section>
      <h2 className="text-xl font-bold sm:text-3xl">Ask how we can help you</h2>
      <div className="flex flex-col gap-y-10 pt-6">
        <InfoBlock
          title="부담없는 1:1 친절 상담"
          desc="오직 사장님과 다이렉트로 상담이 이루어집니다."
        />
        <InfoBlock
          title="24시간 이내 빠른 연락"
          desc="퇴근 후에도 연락이 가능합니다. (새벽 제외)"
        />
        <InfoBlock
          title="간단한 양식 제출"
          desc="우측 양식을 간단하게 적어주셔도 좋습니다."
        />
      </div>
    </section>
  );
};

export default ContactInfo;
