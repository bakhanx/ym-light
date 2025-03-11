import getSession from "@/utils/session";
import Cart from "./_components.tsx/cart";


const CartPage = async () => {
  const session = await getSession();
  const userId = session?.id || null;
  return <Cart userId={userId} />;
};

export default CartPage;
