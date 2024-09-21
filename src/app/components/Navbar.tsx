import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 p-4 text-white flex justify-between items-center">
      {/* 左侧Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">StableFlow</span>
      </div>

      {/* 中间的导航链接 */}
      <div className="flex space-x-8">
        <Link href="/" className="hover:text-green-400 text-lg">
          Stake
        </Link>
        <Link href="/dashboard" className="hover:text-green-400 text-lg">
          Dashboard
        </Link>
      </div>

      {/* 右侧登录按钮 */}
      <div className="flex items-center">
        <button className="bg-pink-600 px-4 py-2 rounded-full">登录</button>
      </div>
    </nav>
  );
};

export default Navbar;
