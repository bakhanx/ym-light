import db from "@/utils/db";

const getProduct = async (id : number) => {
  const product = await db.product.findUnique({
    where: {
      id : +id
    },
  });
  return product;
};

export default getProduct;
