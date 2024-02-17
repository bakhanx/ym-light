type Props = {
  params: {
    id: string;
  };
};

const ProductDetail = ({ params }: Props) => {
  return <div>This page is Product {params.id}</div>;
};

export default ProductDetail;
