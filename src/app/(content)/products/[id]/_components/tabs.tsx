const tabs = ["상품 상세정보", "상품평", "상품 문의", "교환 및 반품"];

const Tabs = () => (
    <div className="my-product-detail-tap-wrap">
      <div className="my-product-detail-tab flex justify-between gap-x-4 border-b-2 border-t-2 border-b-[#010315] px-8 py-5 text-sm sm:gap-x-16 sm:px-16 sm:text-base md:gap-x-28 xl:gap-x-36">
        {tabs.map((tab, index) => (
          <div key={index}>{tab}</div>
        ))}
      </div>
    </div>
  );

  export default Tabs