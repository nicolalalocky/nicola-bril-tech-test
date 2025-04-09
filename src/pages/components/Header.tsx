import React from 'react';
import Image from 'next/image';
import { HeaderProps } from './interfaces/IHeaderProps';

const Header: React.FC<HeaderProps> = ({
  productId = '',
  setProductId = () => {},
  handleKeyPress = () => {},
  showSearchBar = true,
}) => {
  return (
    <header className="w-full bg-[#ff9954] p-4 flex items-center justify-between shadow-md">
      <Image src="/Logo.png" alt="Nicola x BIRL Logo" width={128} height={64} className="w-32 h-auto" />

      {showSearchBar && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-md w-full max-w-lg flex items-center">
          <input
            type="text"
            placeholder="Search by Product ID..."
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 outline-none text-gray-700 text-sm"
          />
          <span className="text-[#ff9954] ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8l4 4m0 0l-4 4m4-4H4" />
            </svg>
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
