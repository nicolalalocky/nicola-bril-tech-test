import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentFormProps } from './interfaces/IPaymentFormProps';



const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (error) {
      console.error('Payment failed:', error.message);
      alert('Payment failed. Please try again.');
    } else {
      alert('A hold has been placed on your card for 10 days.');
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Enter Payment Details</h1>
      <CardElement className="p-4 border border-gray-300 rounded-md mb-4" />
      <button
        type="submit"
        className="px-6 py-3 bg-[#ff9954] text-white rounded-md hover:bg-[#ffbd61] text-lg"
        disabled={!stripe}
      >
        Confirm Payment
      </button>
    </form>
  );
};

export default PaymentForm;