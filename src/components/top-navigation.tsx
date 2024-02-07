const TopNav = () => {
  return (
    <div className="w-full fixed h-10 bg-slate-50 border-b-2 p-4 flex items-center justify-between">
      <div>YM Light</div>
      <ul className="divide-x-2 flex [&>li]:px-2">
        <li>Product</li>
        <li>About</li>
        <li>Contanct</li>
        <li>FAQ</li>
      </ul>
    </div>
  );
};

export default TopNav;
