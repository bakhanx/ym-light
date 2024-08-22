import { getUser } from "@/libs/getUser";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import TopNavigationLayout from "./top-navigation-layout";

const TopNav = async () => {
  const user = await getUser();
  return <TopNavigationLayout user={user}/>;
};

export default TopNav;
