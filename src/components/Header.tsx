import React from "react";

const Header = () => {
  return (
    <header className="h-15 flex items-center justify-between px-4 py-2">
      <h1 className="font-bold text-blue-600">Matthew.</h1>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
        <div className="h-2 w-2 rounded-full bg-white"></div>
      </div>
    </header>
  );
};

export default Header;
