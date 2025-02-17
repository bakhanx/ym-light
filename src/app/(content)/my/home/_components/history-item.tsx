import Link from "next/link";
import { ForwardRefExoticComponent, SVGProps } from "react";

type HistoryItemProps = {
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string; titleId?: string }
  >;
  label: string;
  count: number;
};

const HistoryItem = ({ href, icon: Icon, label, count }: HistoryItemProps) => (
  <Link href={href}>
    <div className="flex gap-x-2 hover:cursor-pointer">
      <div className="flex size-12 items-center justify-center rounded-full bg-gray-200">
        <Icon className="size-6" />
      </div>
      <div className="flex flex-col">
        <div>{label}</div>
        <div className="font-bold text-orange-500">{count}</div>
      </div>
    </div>
  </Link>
);

export default HistoryItem;
