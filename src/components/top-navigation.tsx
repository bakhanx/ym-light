const TopNav = () => {
  return (
    <div className="w-full fixed h-14 text-white border-b-2 bg-black border-yellow-500 p-4 flex items-center justify-between z-50">
      <div className="font-bold text-xl">YM Light</div>
      <ul className="divide-x-2 flex [&>li]:px-2">
        <li className="text-black">
          <select>
            <option>한국어</option>
            <option>English</option>
            <option>中國語</option>
          </select>
        </li>
        <li>Product</li>
        <li>About</li>
        <li>Contanct</li>
        <li>FAQ</li>
      </ul>
    </div>
  );
};

export default TopNav;
