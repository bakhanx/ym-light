import Upload from "../../upload/page";
import getProduct from "@/app/(content)/products/actions/getProduct";

const EditProduct = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(+params.id);

  if (!product) return <div>Loading...</div>;
  return (
    <div>
      <Upload product={product} isEdit={true} />
    </div>
  );
};

export default EditProduct;
