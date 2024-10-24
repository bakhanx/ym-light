import db from "@/utils/db";
import Upload from "../../upload/page";

const getProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id: Number(id),
    },
    include:{
      options: true
    }
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
