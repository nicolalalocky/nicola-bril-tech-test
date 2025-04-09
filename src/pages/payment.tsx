import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from './components/Header';
import { getProduct, Product } from '@/data/products';
import ProductDetails from './components/ProductDetails';
import PaymentForm from './components/PaymentForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function PaymentPage() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false); // New state for payment success

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: productId }),
        });

        if (!response.ok) {
          throw new Error('Failed to create Payment Intent');
        }

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (err) {
        console.error('Payment creation failed:', err);
        alert('Payment creation failed. Please try again.');
      }
    }

    if (!clientSecret) {
      fetchData();
    }

    if (clientSecret && productId) {
      const fetchedProduct = getProduct(productId as string);
      setProduct(fetchedProduct);
      setIsLoading(false);
    }
  }, [productId, clientSecret]);

  const handlePaymentSuccess = () => {
    setPaymentSucceeded(true); // Set payment success state
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#fff2f2]">
      <Header showSearchBar={false} />

      <main className="p-6 flex items-center justify-center">
        <Elements stripe={stripePromise}>
          <div className="max-w-md w-full">
            {paymentSucceeded ? (
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h1>
                <p className="text-gray-600 mb-6">Your payment has been successfully processed.</p>
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-[#ff9954] text-white rounded-md hover:bg-[#ffbd61] text-lg"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {product && <ProductDetails product={product} />}
                {clientSecret && (
                  <PaymentForm
                    clientSecret={clientSecret}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                )}
              </>
            )}
          </div>
        </Elements>
      </main>
    </div>
  );
}
