type InfoBlockProps = {
  title: string;
  desc: string;
};

const InfoBlock = ({ title, desc }: InfoBlockProps) => (
  <div>
    <p className="font-bold">{title}</p>
    <p className="text-sm opacity-70">{desc}</p>
  </div>
);

export default InfoBlock;
