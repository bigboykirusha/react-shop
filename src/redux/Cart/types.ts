export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: string;
  count: number;
};

export interface CartSLiceState {
  items: CartItem[];
  totalPrice: number;
}
