import { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ErrorMessage from './components/ErrorMessage';
import router from 'next/router';
import { Product } from '@/data/products';

export default function Home() {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [error, setError] = useState('');

  const fetchProduct = async () => {
    setError('');
    setProduct(undefined);

    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      setProduct(data);
    } catch {
      setError('Product not found');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchProduct();
    }
  };

  const onBuyNow = async () => {
    if (!product) return;
    router.push({
      pathname: '/payment',
      query: { productId: product.id },
    });
  };

  return (
    <div className="min-h-screen bg-[#fff2f2]">
      <Header productId={productId} setProductId={setProductId} handleKeyPress={handleKeyPress} showSearchBar={true} />

      <main className="p-6">
        {error && <ErrorMessage message={error} />}

        {product && (
          <ProductCard
            product={{
              image: product.image,
              title: product.title,
              description: product.description,
              price_paid: product.price_paid,
            }}
            onBuyNow={onBuyNow}
          />
        )}
      </main>
    </div>
  );
}
