import db from "@/libs/db";
import Upload from "../../upload/page";

const getProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id: Number(id),
    },
  });
  return product;
};

const EditProduct = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);
  console.log(product);

  return (
    <div>
      <Upload product={product} isEdit={true} />;
    </div>
  );
};

export default EditProduct;
