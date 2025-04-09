export interface HeaderProps {
  productId?: string;
  setProductId?: (value: string) => void;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showSearchBar?: boolean;
}
