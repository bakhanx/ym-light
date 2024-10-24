import { getUser } from "@/actions/getUser";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import TopNavigation from "./top-navigation";

const TopNavigationContainer = async () => {
  const user = await getUser();
  return <TopNavigation user={user} />;
};

export default TopNavigationContainer;
