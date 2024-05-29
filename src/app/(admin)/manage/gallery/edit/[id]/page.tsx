import db from "@/libs/db";
import Upload from "../../upload/page";

const getGallery = async (id: string) => {
  const gallery = await db.gallery.findUnique({
    where: {
      id: Number(id),
    },
    include: { tags: true },
  });
  return gallery;
};

const EditProduct = async ({ params }: { params: { id: string } }) => {
  const gallery = await getGallery(params.id);
  console.log(gallery);

  return (
    <div className="">
      <div className="[&>div]:pt-0">
        <Upload gallery={gallery} isEdit={true} />;
      </div>
    </div>
  );
};

export default EditProduct;
