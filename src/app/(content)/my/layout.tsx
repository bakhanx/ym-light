import Sidebar from "./components/sidebar";

type RootLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <div className="wrapper min-h-screen bg-gray-200">
      <div className="m-auto flex max-w-screen-xl gap-x-4 pt-24">
        <Sidebar />
        <div className="right flex w-full flex-col gap-y-4">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
