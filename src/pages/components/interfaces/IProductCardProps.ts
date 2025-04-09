export interface ProductCardProps {
  product: {
    image: string;
    title: string;
    description: string;
    price_paid: number;
  };
  onBuyNow: () => void;
}
