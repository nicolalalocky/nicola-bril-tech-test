import React from 'react';
import { ProductCardProps } from './interfaces/IProductCardProps';

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  return (
    <div className="mt-6 p-6 border border-gray-300 rounded-lg bg-white flex gap-6 max-w-6xl mx-auto">
      <img src={product.image} alt={product.title} width={384} height={384} className="object-cover rounded-lg" />

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h2>

        {/* Description */}
        <p className="text-gray-600 text-base mb-4">{product.description}</p>

        {/* Price and Button */}
        <div className="flex flex-col items-start mt-4">
          <p className="text-2xl text-gray-800 font-semibold mb-4">£{product.price_paid}</p>
          <button
            onClick={onBuyNow}
            className="px-6 py-3 bg-[#ff9954] text-white rounded-md hover:bg-[#ffbd61] text-lg"
          >
            Buy now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
