import {
  BeakerIcon,
  ChatBubbleLeftEllipsisIcon,
  HomeModernIcon,
  LightBulbIcon,
  PhoneIcon,
  PhotoIcon,
  ShoppingBagIcon,
  TableCellsIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";

export const sideNavLinks = [
  { key: "manage", name: "처음으로", href: "/manage", icon: HomeModernIcon },
  {
    key: "product",
    name: "상품관리",
    href: "/manage/product",
    icon: LightBulbIcon,
  },
  {
    key: "order",
    name: "주문관리",
    href: "/manage/order",
    icon: ShoppingBagIcon,
  },
  {
    key: "gallery",
    name: "갤러리관리",
    href: "/manage/gallery",
    icon: PhotoIcon,
  },
  { key: "user", name: "유저관리", href: "/manage/user", icon: UsersIcon },
  {
    key: "chats",
    name: "채팅관리",
    href: "/manage/chats",
    icon: ChatBubbleLeftEllipsisIcon,
  },
  { key: "test", name: "테스트", href: "/manage/test", icon: BeakerIcon },
  // {
  //   key: "about",
  //   name: "소개관리",
  //   href: "/manage/about",
  //   icon: TableCellsIcon,
  // },
  // {
  //   key: "contact",
  //   name: "연락관리",
  //   href: "/manage/contact",
  //   icon: PhoneIcon,
  // },
  // { key: "faq", name: "FAQ관리", href: "/manage/faq" },
];
