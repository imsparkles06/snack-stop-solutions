export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  emoji: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderForm {
  name: string;
  phone: string;
  hostel: string;
  room: string;
}

export interface Order extends OrderForm {
  cartItems: CartItem[];
  totalAmount: number;
  paymentStatus: 'pending' | 'confirmed';
  timestamp: Date;
}
