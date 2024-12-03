type ProductInfoType = {
  label: string;
  data: string;
};

const ProductInfo = ({ label, data }: ProductInfoType) => {
  return (
    <div className="flex gap-x-5">
      <label className="w-12 text-slate-500 shrink-0">{label}</label>
      <div className="flex items-center gap-x-1">      
        <p>{data}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
