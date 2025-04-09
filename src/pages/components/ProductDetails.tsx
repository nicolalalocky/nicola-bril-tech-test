import { ProductDetailsProps } from './interfaces/IProductDetailsProps';

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <>
      <h1 className="text-xl font-bold text-center mb-4">{product.title}</h1>
      <p className="text-center text-gray-600 mb-4">Total Price: £{product.price_paid.toFixed(2)}</p>
      <p className="text-center text-gray-800 font-bold mb-4">
        A hold of £{product.max_credit.toFixed(2)} will be placed on your card for 10 days.
      </p>
    </>
  );
};

export default ProductDetails;
