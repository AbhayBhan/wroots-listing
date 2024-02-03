import React from "react";
import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <nav className="flex items-center justify-between h-16 p-4 px-6 border-b bg-background">
      {/* <button onClick={() => setIsSidebarOpen((pre) => !pre)}>
        <HiMenuAlt2 size={24} />
      </button> */}

      {/* heading */}
      <div className="flex space-x-2">
        <img src={Logo} width={55} />
      </div>
    </nav>
  );
};

export default Header;
